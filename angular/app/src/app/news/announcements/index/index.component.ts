import { Component } from '@angular/core';
import { UserInfo } from 'src/app/template/page/page-common.service';
import { PageComponent } from 'src/app/template/page/page.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { 
  PostData, Reaction, Target,
  DataTableDialogComponent,
  StringUtils,
  DateUtils
} from 'ngx-core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'posts-index',
  templateUrl: './index.component.html'
})
export class IndexComponent extends PageComponent<any> {

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
  userinfo:UserInfo;

  public Editor = ClassicEditor;
  public EditorConfig = {
    toolbar: [ 'Cut', 'Copy', 'PasteText', '|', 'Undo', 'Redo', '|', 'Bold', 'Italic', 'Underline', 'Strike' , 'superscript', 'subscript', '|', 'link' ]
  }

  posts:PostData[];
  private _subscription:Subscription;


  override ngOnInit():void {
    this.celebrateBirthdays();
    this.init("news/posts", "news/posts", "posts-index");
    this.refresh();
    this._subscription = this.service.userinfo.subscribe((info) => {
      this.userinfo = info;
      this.redactor = ["ADMIN", "TEACHER"].includes(info.roleRaw)
    });
    super.ngOnInit();
  }

  override ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  refresh(){
    this.resource("news/posts");
    this.browse().subscribe((response:any[]) => {
      this.posts = response.map(data => {
        data.createdAt = DateUtils.fromNow(data.createdAt);
        return data as PostData
      });
    });
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
    this.resource("news/posts");
    this.add(data).subscribe(() => {
      this.refresh()
    });
  }

  onIonInfinite($event:Event){
    this.http.raw().get<any[]>(this.http.base + "/api/news/posts?page="+this.nextPage).subscribe((response:any[]) => {
      if (response.length == 0)
        this.loadMore = false;
      this.posts.push(...response.map(data => {
        data.createdAt = DateUtils.fromNow(data.createdAt);
        return data as PostData
      }))
      this.nextPage++;
      ($event as InfiniteScrollCustomEvent).target.complete();
    })
  }

  celebrateBirthdays() {
    this.http.raw().get<any[]>(this.http.base + "/api/human-resources/users/birthdays").subscribe(birthdays => {
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
        url = "human-resources/teachers";
        title = "Séléctionner des Enseigants";
        break;
      case Target.PARENT:
        url = "human-resources/parents";
        title = "Séléctionner des Parents";
        break;
      case Target.STUDENT:
        url = "human-resources/students";
        title = "Séléctionner des Élèves";
        break;
      case Target.STAFF:
        url = "human-resources/staff";
        title = "Séléctionner des Personnels";
        break;
    }
    url = this.http.base + '/api/' + url;
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
    console.log('called');
    return this.http.base + "/api/news/posts/" + postId + "/comments";
  }
  getReactionsUrl:(postId:number) => string = (postId:number) => {
    return this.http.base + "/api/news/posts/" + postId + "/reactions";
  }
}
