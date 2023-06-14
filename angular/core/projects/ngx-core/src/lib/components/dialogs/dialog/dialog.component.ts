import { Component, Input } from '@angular/core';

export interface DialogAction {
  label:string;
  theme:string;
  value:any;
}

@Component({
  selector: 'dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {

  @Input()
  title:string="";
  @Input()
  body:string="";
  @Input()
  actions: DialogAction[] = [];
}
