import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface InfoDialogData {
  title: string;
  body: string;
  handler?: Function;
}

@Component({
  selector: 'info-dialog',
  templateUrl: './info-dialog.component.html'
})
export class InfoDialogComponent {

  constructor(
    public dialog: MatDialogRef<InfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InfoDialogData,
  ) {
    this.dialog.afterClosed().subscribe(() => {
      if (this.data.handler != undefined)
        this.data.handler();
    });
  }
}
