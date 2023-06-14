import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { AppDialog } from '../dialog/dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'alert-dialog',
  templateUrl: './alert-dialog.component.html',
  imports: [CommonModule, AppDialog]
})
export class AlertDialog {

  @ViewChild('dialog', { static: true }) private dialog!: AppDialog;

  data = {
    title:"",
    body:"",
    handler: () => {}
  }

  public open(data: {
    title:string,
    body:string,
    handler: () => void
  }) {
    this.data = data;
    this.show();
  }
  public show() {
    this.dialog.open();
  }

  @Output()
  confirm: EventEmitter<void> = new EventEmitter;
}
