import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AppDialog } from '../dialog/dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'delete-dialog',
  templateUrl: './delete-dialog.component.html',
  imports: [CommonModule, AppDialog]
})
export class DeleteDialog {

  @ViewChild('dialog', { static: true }) private dialog!: AppDialog;

  data = {
    subject:"",
    handler: () => {}
  }

  public open(data: {
    subject:string,
    handler: () => void
  }) {
    this.data = data;
    this.subject = data.subject;
    this.show();
  }
  public show() {
    this.dialog.open();
  }

  @Input()
  subject:string = "";

  @Output()
  confirm: EventEmitter<void> = new EventEmitter;
}
