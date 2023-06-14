import { Component, Input } from '@angular/core';

export class ReactionData {
  picture:string="";
  name:string="";
  role:string="";
  reaction:string="";
}

@Component({
  selector: 'reaction-item',
  templateUrl: './reaction-item.component.html',
  styleUrls: ['./reaction-item.component.css']
})
export class ReactionItemComponent {
  @Input()
  placeholder:boolean = false;

  @Input()
  data:ReactionData = new ReactionData;
}
