import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dataTableColumnsFromDefault } from 'src/app/template/components/data-table/data-table.component';

export interface DialogData {
  list: any[];
  handler: (item:any) => void;
}

@Component({
  selector: 'parent-dialog',
  template: `
<h1 mat-dialog-title class="mat-typography">Sélectionner</h1>
<div mat-dialog-content>
  <data-table [source]="data.list" [config]="dataTableConfig"></data-table>
</div>
<div mat-dialog-actions>
  <button class="ml-1 btn btn-sm btn-default" [mat-dialog-close]="false">Annuler</button>
  <button class="ml-1 btn btn-sm btn-info" [mat-dialog-close]="true">Confirmer</button>
</div>
  `
})
export class ParentDialogComponent {

  selected:any

  constructor(
    public dialog: MatDialogRef<ParentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.dialog.afterClosed().subscribe(result => {
      if (result)
        this.data.handler(this.selected);
    });
  }

  dataTableConfig = {
      title:'Liste des Parents',
      columns: dataTableColumnsFromDefault({
        ref: "",
        label: "",
        visible: true,
        sortable: true,
        filter: {
          datatype: "string"
        }
      },  
      [
        {
          ref: "id",
          label: "No.",
          filter: { datatype: "number" }
        },
        {
          ref: "code",
          label: "Code",
          visible: false
        },
        {
          ref: "firstName",
          label: "Prénom",
        },
        {
          ref: "lastName",
          label: "Nom"
        },
        {
          ref: "active",
          label: "Activé",
          visible: false,
          sortable: false,
          display: function(value:boolean){ return `<span class="badge badge-pill bg-${value ? 'success' : 'danger'} text-md font-weight-normal">${value ? 'oui' : 'non'}</span>` },
          filter: { datatype: "boolean", init: true, checkbox: { labelOn: "activé", labelOff: "désactivé", labelIn: "ignoré" } }
        },
        {
          ref: "archived",
          label: "Archivé",
          visible: false,
          sortable: false,
          display: function(value:boolean){ return `<span class="badge badge-pill bg-${value ? 'success' : 'danger'} text-md font-weight-normal">${value ? 'oui' : 'non'}</span>` },
          filter: { datatype: "boolean", init: false, checkbox: { labelOn: "archivé", labelOff: "désarchivé", labelIn: "ignoré" } },
        }
      ]),
      selection: true,
      singleSelection: {
        enabled: true,
        onSelect: (item:any) => this.selected = item
      },
      pagination:true,
      actions: {
        enabled: false,
        import: {
          enabled: false
        },
        add: {
          enabled:false
        }
      }
    };
}
