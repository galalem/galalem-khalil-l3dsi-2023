import { Component } from '@angular/core';
import { PersonList } from '../generic/list.page';

@Component({
  selector: 'parent-list',
  template: `
<ion-content>
<div class="py-2">
  <app-alert #alert></app-alert>
  <data-table [source]="list" [config]="dataTableConfig"></data-table>
</div>
</ion-content>
`,
})
export class ListPage extends PersonList {

  protected override get ref() { return "parents"; }
  protected override get listSelector() { return "parent-list"; }
  protected override get subject() { return "le parent"; }
  protected override get subjectPlural() { return "parents"; }
  protected override get customColumns() {
    return [
      {
        ref: "children",
        label: "Nombre Enfants",
        visible: true,
        filter: { datatype: "number" }
      },
      {
        ref: "idNumber",
        label: "Pièce d'identité No.",
        visible: false,
      },
    ]
  };
}
