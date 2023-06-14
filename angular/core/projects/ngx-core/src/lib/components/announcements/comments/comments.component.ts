import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonModal } from '@ionic/angular';
import * as NumberUtils from '../../../utils/numbers';
import * as DateUtils from '../../../utils/dates';
import { CommentData } from '../comment-item/comment-item.component';
import { ReactionData } from '../reaction-item/reaction-item.component';

@Component({
  selector: 'post-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  @ViewChild(IonModal) modal?: IonModal;
  @ViewChild('input') input?:ElementRef;

  @Input()
  trigger:string="";

  @Input("post-id")
  postId:number=0;

  answering:CommentData|undefined = undefined;

  @Input()
  mode:"comments"|"reactions" = "comments";

  comments:CommentData[] = [];
  userReactions:ReactionData[][] = [];
  
  commentsPlaceholders:any[] = [];
  commentsNumber:number = 0;

  @Input("top-reactions")
  topReactions:any[]=[];

  reactionsPlaceholders:any[][] = [];
  reactions:[string, number][] = [];
  @Input("reactions")
  set __reactions(reactions:{
    like: number,
    hate: number,
    haha: number,
    wow: number,
    sad: number,
    angry: number,
    disinterested: number,
    comment: number,
    view: number
  }) {
    const temp:any = Object.assign({}, reactions);
    delete temp.comment;
    delete temp.view;
    this.reactions = Object.entries<number>(temp)
      .sort((a, b) => b[1] - a[1])
      .filter(entry => entry[1] > 0);

    this.reactions.unshift((["", this.reactions.map(item => item[1]).reduce((elm, sum) => elm + sum, 0)]));
    this.reactionsPlaceholders = this.reactions.map((entry) => Array.from(Array(entry[1]).keys()));
    
    this.commentsNumber = reactions.comment;
    this.commentsPlaceholders = Array.from(Array(this.commentsNumber).keys());
  }


  @Input("user")
  currentUser:any;
  constructor(private http:HttpClient){ }


  formatNumbers = NumberUtils.formatNumber;

  start() {
    this.loadComments();
    this.loadReactions();
  }
  loadComments() {
    this.http.get<any[]>(this.getCommentsUrl(this.postId)).subscribe(comments => {
      this.comments = comments.map((comment:any) => this.parseComment(comment));
      this.commentsPlaceholders = [];
    });
  }
  loadReactions() {
    this.http.get<any[]>(this.getReactionsUrl(this.postId)).subscribe(reactions => {
      reactions = reactions.filter(item => item.reaction != null).map(item => { return {reaction: item.reaction.toLowerCase(), ...item.user} });
      this.userReactions = [reactions];
      this.reactions = [["", reactions.length]]
      const classified = Object.entries([...reactions].reduce((group, single) => {
        const { reaction } = single;
        group[reaction] = group[reaction] ?? [];
        group[reaction].push(single);
        return group;
      }, {})).sort((a:any, b:any) => b[1].length - a[1].length);
      this.userReactions.push(...classified.map((item:any) => item[1]))
      this.reactions.push(...classified.map((item:any) => {item[1] = item[1].length; return item;}));

      for (let i = 0; i < this.reactionsPlaceholders.length; i++)
        this.reactionsPlaceholders[i] = [];
    });
  }

  parseComment(comment:any):CommentData {
    comment.timestamp = DateUtils.fromNow(comment.createdAt);
    comment.responses = comment.responses.map((res:any) => this.parseComment(res));
    return comment as CommentData
  }

  onSubmit($event:Event) {
    $event.stopPropagation();
    $event.preventDefault();

    if (!this.input) return;

    let formData:FormData = new FormData();
    formData.append("content", this.input.nativeElement.value);

    const postUrl = this.postUrl(this.postId, this.answering === undefined ? false : this.answering.id);
    this.http.post(postUrl, formData).subscribe(() => this.loadComments());

    this.input.nativeElement.value = "";
    this.input.nativeElement.blur();
    this.answering = undefined;
  }

  @Input("submit-comment-url")
  postUrl:(postId:number, answeringId:number|false) => string = (postId:number, answeringId:number|false) => {
    return "api/news/posts/" + postId + "/comments" + (answeringId === false ? "" : "/" + answeringId);
  }

  @Input("load-comments-url")
  getCommentsUrl:(postId:number) => string = (postId:number) => {
    return "api/news/posts/" + postId + "/comments";
  }
  @Input("load-reactions-url")
  getReactionsUrl:(postId:number) => string = (postId:number) => {
    return "api/news/posts/" + postId + "/reactions";
  }

}
