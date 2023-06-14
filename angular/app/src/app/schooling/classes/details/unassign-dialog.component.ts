import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface UnassignDialogData {
  subject: string;
  handler: Function;
}

@Component({
  selector: 'unassign-dialog',
  template: `
<h1 mat-dialog-title class="mat-typography">Désaffecter</h1>
<div mat-dialog-content>
  <p>Êtes-vous sûr de bien vouloir désaffecter {{data.subject}} ?</p>
</div>
<div mat-dialog-actions>
  <button class="ml-1 btn btn-sm btn-secondary" [mat-dialog-close]="false">Non Merci</button>
  <button class="ml-1 btn btn-sm btn-danger" [mat-dialog-close]="true">Désaffecter</button>
</div>`,
})
export class UnassignDialogComponent {
  constructor(
    public dialog: MatDialogRef<UnassignDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UnassignDialogData,
  ) {
    this.dialog.afterClosed().subscribe(result => {
      if (result)
        this.data.handler();
    });
  }
}
