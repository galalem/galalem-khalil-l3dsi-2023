import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'alert-danger',
  template: `<app-alert type="danger" [icon]="icon" [title]="title" [message]="message" (close)="close.emit()"></app-alert>`,
})
export class AlertDangerComponent {

  @Input()
  title:string="";

  @Input()
  message:string="";

  @Input()
  icon:string|undefined=undefined;

  @Output() close: EventEmitter<void> = new EventEmitter<void>();
}
