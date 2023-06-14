import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface PreviewDialogData {
  year: string;
  departments: any[];
  handler: Function;
}

@Component({
  selector: 'preview-dialog',
  template: `
<h1 mat-dialog-title class="mat-typography">Nouvelle Année Scolaire</h1>
<div mat-dialog-content>
  <div class="pt-1">
  <div class="timeline">
    <div class="time-label">
        <span class="bg-purple font-weight-normal px-2">&nbsp;{{data.year}}&nbsp;</span>
    </div>
    <div *ngFor="let department of data.departments">
        <i class="fas bg-indigo"><ngx-fa-icon icon="circle" size="xs" style="vertical-align: middle;"></ngx-fa-icon></i>
        <div class="timeline-item">
            <h3 class="timeline-header">
                <a href="javascript:;" class="text-navy">{{department.name}}</a> &#x2022;
                <span *ngIf="department.periods?.length == 3">Régime Trimestriel</span>
                <span *ngIf="department.periods?.length == 2">Régime Semestriel</span>
                <span *ngIf="department.periods?.length != 3 && department.periods?.length != 2 && department.periods">Régime Personalisé</span>
                <i *ngIf="!department.periods">Exclu</i>
            </h3>
            <div class="timeline-body" *ngIf="department.periods">
                <div class="timeline mt-1 mb-0">
                    <div *ngFor="let period of department.periods; let index=index">
                        <i class="fas bg-secondary" style="width: 16px; height: 16px; line-height: 16px; left: 25px; top: 7px;"></i>
                        <div class="timeline-item">
                            <span class="time">{{period.startsAt}}-{{period.endsAt}}</span>
                            <h3 class="timeline-header">
                                <span *ngIf="department.periods.length == 3">Trimestre</span>
                                <span *ngIf="department.periods.length == 2">Semestre</span>
                                <span *ngIf="department.periods.length != 3 && department.periods.length != 2">Période</span>
                                N°{{index + 1}}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <i class="fas bg-gray"><ngx-fa-icon icon="square" size="xs" style="vertical-align: middle;"></ngx-fa-icon></i>
    </div>
</div>
  </div>
</div>
<div mat-dialog-actions>
  <button class="ml-1 btn btn-secondary" [mat-dialog-close]="false">Annuler</button>
  <button class="ml-1 btn btn-success" [mat-dialog-close]="true">Confirmer</button>
</div>  
`
})
export class PreviewDialogComponent {
  constructor(
    public dialog: MatDialogRef<PreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PreviewDialogData,
  ) {
    this.dialog.afterClosed().subscribe(result => {
      if (result)
        this.data.handler(this.data);
    });
  }
}
