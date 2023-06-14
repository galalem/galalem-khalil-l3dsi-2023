import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import * as Files from '../../../data/files';
import * as StringUtils from '../../../utils/strings';


export enum Target {
  PUBLIC = "PUBLIC",
  CLASS = "CLASS",
  TEACHER = "TEACHER",
  PARENT = "PARENT",
  STUDENT = "STUDENT",
  STAFF = "STAFF"
}

export enum Reaction {
  LIKE = "LIKE",
  HATE = "HATE",
  HAHA = "HAHA",
  WOW = "WOW",
  SAD = "SAD",
  ANGRY = "ANGRY",
  DISINTERESTED = "DISINTERESTED"
}

export class PostData {
  id:number=0;

  author: {
    uid:string,
    username:string,
    picture:string,
    name:string,
    role:string
  } = {
    uid:"",
    username:"",
    picture:"",
    name:"",
    role:""
  };

  target:Target=Target.PUBLIC;
  
  title:string="";
  content:string="";

  attachments:string[]=[];

  reactions: {
    like: number,
    hate: number,
    haha: number,
    wow: number,
    sad: number,
    angry: number,
    disinterested: number,
    comment: number,
    view: number
  } = {
    like: 0,
    hate: 0,
    haha: 0,
    wow: 0,
    sad: 0,
    angry: 0,
    disinterested: 0,
    comment: 0,
    view: 0
  }

  userHasSeen:boolean=false;
  userReaction:Reaction|null=null;

  commentsEnabled:boolean=false;
  reactionsEnabled:boolean=false;

  createdAt:string="";
}

@Component({
  selector: 'announcement-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @ViewChild('post') element?:ElementRef;

  constructor() {
    document.addEventListener('mouseup', ($event) => {if (this.toggleReactions) this.onReact($event, null)});
    document.addEventListener('touchend', ($event:any) => {
      if (!this.toggleReactions)
        return;

      let $el = $event.target.parentElement.querySelector('.reactions > .react-btn.active');
      if ($el) {
        $el.classList.toggle('active', false);
        $el.dispatchEvent(new Event('mouseup'));
        return;
      }

      this.onReact($event, null)
    });
    document.addEventListener('touchmove', ($event:any) => {
      if (!this.toggleReactions)
        return;
      $event.target.parentElement.querySelectorAll('.reactions > .react-btn').forEach(($el:any) => {
        let point = $event.touches[0];
        let rect = $el.getBoundingClientRect();
        let hovering = point.pageX >= rect.x && point.pageX <= rect.x + rect.width && point.pageY >= rect.y && point.pageY <= rect.y + rect.height;
        $el.classList.toggle('active', hovering);
      });
      $event.preventDefault();
    }, { passive: false });

    const triggerSeen = () => { 
      if (this._data.userHasSeen) {
        window.removeEventListener('DOMContentLoaded', triggerSeen, false);
        window.removeEventListener('load', triggerSeen, false);
        window.removeEventListener('ion-scroll', triggerSeen, false);
        window.removeEventListener('resize', triggerSeen, false);
        return;
      }
      if (this.isPostVisible()){
        this._data.userHasSeen = true;
        this._data.reactions.view++;
        this.reacted.emit(this._data.userReaction === null ? undefined : this._data.userReaction);
      }
    }

    window.addEventListener('DOMContentLoaded', triggerSeen, false);
    window.addEventListener('load', triggerSeen, false);
    window.addEventListener('ion-scroll', triggerSeen, false);
    window.addEventListener('resize', triggerSeen, false);
  }

  reactions = [
    {label: "J'aime", reaction: Reaction.LIKE, image: "assets/img/reactions/like.png", icon: "thumbs-up", iconType: "solid", theme: "primary"},
    {label: "J'aime pas", reaction: Reaction.HATE, image: "assets/img/reactions/hate.png", icon: "fa-thumbs-down", iconType: "solid", theme: "danger"},
    {label: "Haha", reaction: Reaction.HAHA, image: "assets/img/reactions/haha.png", icon: "face-laugh", iconType: "regular", theme: "warning"},
    {label: "Wouah", reaction: Reaction.WOW, image: "assets/img/reactions/wow.png", icon: "face-surprise", iconType: "regular", theme: "warning"},
    {label: "Triste", reaction: Reaction.SAD, image: "assets/img/reactions/sad.png", icon: "face-sad-tear", iconType: "regular", theme: "warning"},
    {label: "Furieux", reaction: Reaction.ANGRY, image: "assets/img/reactions/angry.png", icon: "face-angry", iconType: "regular", theme: "danger"},
    {label: "Indifférent", reaction: Reaction.DISINTERESTED, image: "assets/img/reactions/disinterested.png", icon: "face-meh", iconType: "regular", theme: "warning"},
  ];

  hasImages:boolean = false;
  hasAttachments:boolean = false;

  private _topReactions: string[]=[];
  private _data:PostData = new PostData;
  @Input() 
  set data(value:PostData){
    this._data = value;
    this._topReactions = this.filterReaction()
      .slice(0, 3)
      .map(entry => `assets/img/reactions/${entry[0]}.png`)
      .reverse();
    this.textTooLong = this.data.content.length > this.trimHTML(this.data.content).length;
    this.bodyExpanded = !this.textTooLong;

    this.hasImages = false;
    this.hasAttachments = false;
    if (value.attachments?.length){
      if (value.attachments.every(link => Files.getFileInfoByExtension(link.split('.').pop() || '').mime[0]?.startsWith('image/')))
        this.hasImages = true;
      else
        this.hasAttachments = true;
    }
  }
  get data():PostData {
    return this._data;
  }
  get topReactions():string[]{
    return this._topReactions;
  }

  @Output() reacted:EventEmitter<Reaction> = new EventEmitter();

  toggleReactions:boolean = false;
  bodyExpanded:boolean = false;
  textTooLong:boolean = false;

  onReact($event:any, reaction:Reaction|null) {
    $event.preventDefault();
    $event.stopPropagation();
    this.toggleReactions = false;
    if (this._data.userReaction === reaction)
      return;
    if (this._data.userReaction !== null)
      this._data.reactions[this._data.userReaction.toLowerCase() as keyof PostData["reactions"]]--;
    if (reaction !== null)
      this._data.reactions[reaction.toLowerCase() as keyof PostData["reactions"]]++;

    this._data.userReaction = reaction;
    this.reacted.emit(reaction === null ? undefined : reaction);
    this._topReactions = this.filterReaction().slice(0, 3).map(entry => `assets/img/reactions/${entry[0]}.png`).reverse();
  }

  filterReaction():[string, number][]{
    const reactions:any = Object.assign({}, this._data.reactions);
    delete reactions.comment;
    delete reactions.view;
    return Object.entries<number>(reactions)
      .sort((a, b) => b[1] - a[1])
      .filter(entry => entry[1] > 0);
  }

  getReactionIcon():string {
    return this.reactions.find(item => item.reaction === this._data.userReaction)?.icon || "thumbs-up";
  }
  getReactionIconType():"solid" | "regular" | "brand" {
    return this.reactions.find(item => item.reaction === this._data.userReaction)?.iconType as "solid" | "regular" | "brand" || "regular";
  }
  getReactionLabel():string {
    return this.reactions.find(item => item.reaction === this._data.userReaction)?.label || "J'aime";
  }
  getReactionTheme():string {
    return this.reactions.find(item => item.reaction === this._data.userReaction)?.theme || "secondary";
  }

  getTargetIcon(target:Target):string {
    switch(target) {
      case Target.PUBLIC:
        return "earth";
      case Target.CLASS:
        return "graduation-cap";
      case Target.TEACHER:
        return "user-tie";
      case Target.STUDENT:
        return "user-graduate";
      case Target.PARENT:
        return "user-shield";
      case Target.STAFF:
        return "user-gear";
    }
  }

  getTargetLabel(target:Target):string {
    switch(target) {
      case Target.PUBLIC:
        return "Public";
        case Target.CLASS:
          return "Classes";
        case Target.TEACHER:
          return "Enseignants";
        case Target.STUDENT:
          return "Élèves";
        case Target.PARENT:
          return "Parents";
        case Target.STAFF:
          return "Personnels";
    }
  }

  getTotalReactions(reactions:PostData['reactions']):string{
    const clone:any = Object.assign({}, reactions);
    delete clone.comment;
    delete clone.view;
    let total = Object.values<number>(clone).reduce((elm, sum) => elm + sum);
    if (this._data.userReaction === null)
      return this.formatNumber(total);
    total--;
    if (total > 0)
      return 'vous et ' + this.formatNumber(total) + ' autres';
    return 'vous'
  }

  formatNumber(value:number):string {
    if (value < 1E5)
      return ""+value;
    var suffixes = ["", "k", "m", "b","t"];
    var index = Math.floor( (""+value).length/3 );
    return parseFloat( (index != 0 ? (value / Math.pow(1000, index) ) : value).toPrecision(2)).toFixed(1) + suffixes[index];
  }

  trimHTML(value:string) {
    return StringUtils.substringHTML(value, 0, 255);
  }

  isPostVisible () {
    var rect = this.element?.nativeElement.getBoundingClientRect();
    const isPartVisible = (edge:number) => edge >= 100 && edge <= (window.innerHeight || document.documentElement.clientHeight) - 100
    return isPartVisible(rect.top) || isPartVisible(rect.bottom);
  }

  @Input("user")
  currentUser:any;

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
