import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { AppDialog } from '../dialog/dialog.component';

@Component({
  standalone: true,
  selector: 'info-dialog',
  templateUrl: './info-dialog.component.html',
  imports: [CommonModule, AppDialog]
})
export class InfoDialog { 
  

  @ViewChild('dialog', { static: true }) private dialog!: AppDialog;

  data = {
    title:"",
    body:"",
  }

  public open(data: {
    title:string,
    body:string,
  }) {
    this.data = data;
    this.show();
  }
  public show() {
    this.dialog.open();
  }
}
