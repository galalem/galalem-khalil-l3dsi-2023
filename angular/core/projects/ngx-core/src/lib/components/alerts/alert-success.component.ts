import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'alert-success',
  template: `<app-alert type="success" [icon]="icon" [title]="title" [message]="message" (close)="close.emit()"></app-alert>`,
})
export class AlertSuccessComponent {

  @Input()
  title:string="";

  @Input()
  message:string="";

  @Input()
  icon:string|undefined=undefined;

  @Output() close: EventEmitter<void> = new EventEmitter<void>();
}
