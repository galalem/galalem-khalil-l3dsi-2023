import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'alert-warning',
  template: `<app-alert type="warning" [icon]="icon" [title]="title" [message]="message" (close)="close.emit()"></app-alert>`,
})
export class AlertWarningComponent {

  @Input()
  title:string="";

  @Input()
  message:string="";

  @Input()
  icon:string|undefined=undefined;

  @Output() close: EventEmitter<void> = new EventEmitter<void>();
}
