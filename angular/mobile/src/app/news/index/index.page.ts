import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { BREADService, DataTableDialogComponent, DateUtils, PostData, Reaction, StringUtils, Target } from 'ngx-core';
import { AppCommonService } from 'src/app/app.service';
import { Page } from '../../page/page.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'news-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage extends Page<any> {
  entity = {
    openForm:false,
    id:0,
    target:Target.PUBLIC,
    title:"",
    content:"",
    createdAt: "",
    attachments:[] as File[],
    reactionsEnabled:true,
    commentsEnabled:true,

    targetIds: [] as number[]
  }

  birthdays:string = "";
  redactor:boolean = false;
  loadMore:boolean = true;
  nextPage:number = 1;

  //public Editor = ClassicEditor;
  public EditorConfig = {
    toolbar: [ 'Cut', 'Copy', 'PasteText', '|', 'Undo', 'Redo', '|', 'Bold', 'Italic', 'Underline', 'Strike' , 'superscript', 'subscript', '|', 'link' ]
  }

  posts:PostData[]=[];

  override ngOnInit(): void {
    super.ngOnInit();
    this.init("news/posts", "news/posts", "posts-index");
    this.refresh();
    this.redactor = ["ADMIN", "TEACHER"].includes(this.userinfo.roleRaw);
  }

  refresh(){
    this.posts=[];
    this.nextPage=1;
    this.loadMore=true;
    this.entity.openForm = false;
    this.entity.id = 0;
    this.entity.target = Target.PUBLIC;
    this.entity.title = "";
    this.entity.content = "";
    this.entity.createdAt = "";
    this.entity.attachments = [];
    this.entity.reactionsEnabled = true;
    this.entity.commentsEnabled = true;
    this.entity.targetIds = [];
    this.celebrateBirthdays();
    this.http.resource("news/posts").browse().subscribe((response:any[]) => {this.posts = this.digestPosts(response)})
  }

  onReacted(id:number, reaction:Reaction|undefined){
    let formData:FormData = new FormData();
    if(reaction) formData.append("reaction", reaction);
    this.http.resource("news/posts").edit(id+"/reactions",formData).subscribe((response:any) => {})
  }

  onSubmit(){

    if (StringUtils.isBlank(this.entity.title) || StringUtils.isBlank(this.entity.content) || (this.entity.target != Target.PUBLIC && !this.entity.targetIds.length)){
      this.requestAlert(`Le Titre et le Contenu sont obligatoires`, 400, "posts-index")
      return;
    }
    let data = new FormData();
    data.append("target", this.entity.target)
    for (let id of this.entity.targetIds)
      data.append("targetIds[]", id+'')
    data.append("title", this.entity.title)
    data.append("content", this.entity.content)
    for (let file of this.entity.attachments)
      data.append("attachments[]", file)
    data.append("reactionsEnabled", this.entity.reactionsEnabled ? "on" : "off")
    data.append("commentsEnabled", this.entity.commentsEnabled ? "on" : "off")
    if (!StringUtils.isBlank(this.entity.createdAt)) data.append("createdAt", new Date(this.entity.createdAt).toISOString())
    this.http.resource("news/posts").add(data).subscribe(() => {
      this.refresh()
    });
  }

  onIonInfinite($event:Event){
    this.http.raw().get<any[]>(this.http.base + "/api/news/posts?page="+this.nextPage).subscribe((response:any[]) => {
      if (response.length == 0)
        this.loadMore = false;
      this.posts.push(...this.digestPosts(response));
      this.nextPage++;
      ($event as InfiniteScrollCustomEvent).target.complete();
    })
  }

  digestPosts(response:any[]):PostData[] {
    return response.map(data => {
      data.createdAt = DateUtils.fromNow(data.createdAt);
      data.attachments = data.attachments.map((link:string) => this.http.base + '/' + link);
      return data as PostData
    })
  }

  celebrateBirthdays() {
    this.http.raw().get<any[]>(this.http.base + "/api/human-resources/users/birthdays").subscribe((birthdays:string[]) => {
      if (birthdays.length > 1){
        let last = birthdays.pop();
        last = birthdays.pop() + " et " + last;
        birthdays.push(last);
      }
      this.birthdays = birthdays.join(', ');
    });
  }

  showSelectDialog() {
    let url = "", title = "";
    switch (this.entity.target){
      case Target.TEACHER:
        url = "api/human-resources/teachers";
        title = "Séléctionner des Enseigants";
        break;
      case Target.PARENT:
        url = "api/human-resources/parents";
        title = "Séléctionner des Parents";
        break;
      case Target.STUDENT:
        url = "api/human-resources/students";
        title = "Séléctionner des Élèves";
        break;
      case Target.STAFF:
        url = "api/human-resources/staff";
        title = "Séléctionner des Personnels";
        break;
    }
    url = this.http.base + url;
    this.http.raw().get<any[]>(url).subscribe((data:any[]) => {
      this.dialog.open(DataTableDialogComponent, {
        data: {
          data:data.filter(data => data.active && !data.archived),

          title:title,
          // TODO add class support
          columns: [
            {
              ref: "id",
              label: "No.",
              visible: true,
              sortable: true,
              filter: { datatype: "number" }
            },
            {
              ref: "firstName",
              label: "Prénom",
              visible: true,
              sortable: true,
              filter: { datatype: "string" }
            },
            {
              ref: "lastName",
              label: "Nom",
              visible: true,
              sortable: true,
              filter: { datatype: "string" }
            }
          ],
        
          preSelected: (entity:any) => this.entity.targetIds.includes(entity.id),
          multipleSelection:true,
          pagination:true,
        
          onSelect: (value:any[]) => {this.entity.targetIds = value.map(entity => entity.id)}
        }
      });
    });
  }

  postUrl:(postId:number, answeringId:number|false) => string = (postId:number, answeringId:number|false) => {
    return this.http.base + "/api/news/posts/" + postId + "/comments" + (answeringId === false ? "" : "/" + answeringId);
  }
  getCommentsUrl:(postId:number) => string = (postId:number) => {
    return this.http.base + "/api/news/posts/" + postId + "/comments";
  }
  getReactionsUrl:(postId:number) => string = (postId:number) => {
    return this.http.base + "/api/news/posts/" + postId + "/reactions";
  }
}
