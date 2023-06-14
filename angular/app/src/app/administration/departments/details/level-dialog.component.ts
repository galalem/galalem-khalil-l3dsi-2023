import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SelectOption } from "ngx-core";

export interface Level {
  id?: number;
  name: string;
  acronym: string;
  parent?:number;
}

export interface LevelDialogData {
  levels: Level[];
  level?: Level;
  parent?:number;
  handler: Function;
}

@Component({
  selector: 'delete-dialog',
  template: `
<h1 mat-dialog-title class="mat-typography">{{level ? 'Nouveau' : 'Modifier'}} Niveaux</h1>
<div mat-dialog-content>
  <div class="pt-1">
    <select-input label="Précédant" [options]="options" [(ngModel)]="level.parent"></select-input>
    <text-input label="Nom" [(ngModel)]="level.name"></text-input>
    <text-input label="Acronyme" [(ngModel)]="level.acronym"></text-input>
  </div>
</div>
<div mat-dialog-actions>
  <button class="ml-1 btn btn-secondary" [mat-dialog-close]="false">Annuler</button>
  <button class="ml-1 btn btn-success" [mat-dialog-close]="true">Confirmer</button>
</div>  
`
})
export class LevelDialogComponent {
  constructor(
    public dialog: MatDialogRef<LevelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LevelDialogData,
  ) {
    this.dialog.afterClosed().subscribe(result => {
      if (result)
        this.data.handler(this.level);
    });
    this.options = [{value: 0, label: "Racine"}, ...data.levels.map(level => { return {value: level.id, label: level.name} })];
    if (data.level)
      this.level = data.level;
    else if (data.parent)
      this.level.parent = data.parent;
    if (!this.level.parent)
      this.level.parent = 0;
  }

  options:SelectOption[];
  level:Level = {
    name:"",
    acronym:"",
  }
}
