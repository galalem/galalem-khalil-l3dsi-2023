import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface PreviewDialogData {
	year: string;
	departments: any[];
	handler: Function;
}

@Component({
	selector: 'create-department-dialog',
	template: `
<h1 mat-dialog-title class="mat-typography">Nouvelle Année Scolaire</h1>
<div mat-dialog-content>
	<div class="pt-1">
		<div class="row mt-3">
			<div [class]="'col-' + (regime == 1 ? 6 : 12)">
				<select-input label="Régime" name="regime" [(ngModel)]="regime" [options]="REGIME_OPTIONS"></select-input>
			</div>
			<div class="col-6" *ngIf="regime == 1">
				<text-input label="Nombre de Périodes" name="periods" type="number" [(ngModel)]="periods"></text-input>
			</div>
		</div>

		<date-range *ngFor="let range of ranges; let i = index;" [ngModel]="range" (ngModelChange)="range.start = $event.start; range.end = $event.end; log(range)" [required]="true"
			[label]="(regime == 3 ? 'Trimèstre' : (regime == 2 ? 'Semèstre' : 'Période')) + ' ' + (i + 1)" name="period[]"></date-range>

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
