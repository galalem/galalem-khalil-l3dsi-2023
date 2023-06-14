import { Component, ViewChild } from '@angular/core';
import { AppDialog, DateUtils } from 'ngx-core';

export interface PreviewDialogData {
  year: string;
  departments: any[];
  handler: Function;
}

@Component({
  selector: 'school-year-form-preview-dialog',
  template: `
<app-dialog #dialog>
<span dialog-title>Nouvelle Année Scolaire</span>
<div class="pt-1" style="min-width: 50vw;">
  <div class="timeline">
    <div class="time-label">
        <span class="bg-purple font-weight-normal px-2">&nbsp;{{data.year}}&nbsp;</span>
    </div>
    <div *ngFor="let department of data.departments">
        <i class="fas bg-indigo"><ngx-fa-icon icon="circle" size="xs" style="vertical-align: middle;"></ngx-fa-icon></i>
        <div class="timeline-item">
            <h3 class="timeline-header">
                <a href="javascript:;" class="text-navy">{{department.name}}</a> &#x2022;
                <span *ngIf="department.periods.length == 3">Régime Trimestriel</span>
                <span *ngIf="department.periods.length == 2">Régime Semestriel</span>
                <span *ngIf="department.periods.length != 3 && department.periods.length != 2 && department.periods.length">Régime Personalisé</span>
                <i *ngIf="!department.periods.length">Exclu</i>
            </h3>
            <div class="timeline-body" *ngIf="department.periods.length">
                <div class="timeline mt-1 mb-0">
                    <div *ngFor="let period of department.periods; let index=index">
                        <i class="fas bg-secondary" style="width: 16px; height: 16px; line-height: 16px; left: 25px; top: 7px;"></i>
                        <div class="timeline-item">
                            <span class="time">{{formatDate(period.start)}}-{{formatDate(period.end)}}</span>
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
<ng-container dialog-actions>
  <button class="ml-1 btn btn-secondary" (click)="dialog.close()">Annuler</button>
  <button class="ml-1 btn btn-success" (click)="data.handler(data); dialog.close()">Confirmer</button>
</ng-container>  
</app-dialog>
`
})
export class PreviewDialogComponent {

  @ViewChild('dialog') dialog: AppDialog;

  private _data: PreviewDialogData = {
    year: "",
    departments: [],
    handler: () => {}
  };
  get data() {
    return this._data;
  }

  public open(data:PreviewDialogData) {
    this._data = data;
    this.dialog.open();
  }

  formatDate(date:Date) {
    return DateUtils.format(date.toISOString(), 'DD/MM/YYYY')
  }
}
