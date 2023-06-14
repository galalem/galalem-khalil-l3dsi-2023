import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'alert-info',
  template: `<app-alert type="info" [icon]="icon" [title]="title" [message]="message" (close)="close.emit()"></app-alert>`,
})
export class AlertInfoComponent {

  @Input()
  title:string="";

  @Input()
  message:string="";

  @Input()
  icon:string|undefined=undefined;

  @Output() close: EventEmitter<void> = new EventEmitter<void>();
}
