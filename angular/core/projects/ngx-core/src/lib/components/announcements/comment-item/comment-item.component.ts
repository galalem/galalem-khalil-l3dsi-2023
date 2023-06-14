import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface CommentData {
  id:number;
  author: {
    picture:string;
    name:string;
    role:string;
  }
  content:string;
  timestamp:string;
  responses:CommentData[];
}

@Component({
  selector: 'comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent {

  @Input()
  placeholder:boolean = false;

  @Input()
  data:CommentData|undefined;

  @Output() answer:EventEmitter<CommentData> = new EventEmitter();
}
