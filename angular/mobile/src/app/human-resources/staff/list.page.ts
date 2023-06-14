import { Component } from '@angular/core';
import { PersonList } from '../generic/list.page';

@Component({
  selector: 'staff-list',
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

  protected override get ref() { return "staff"; }
  protected override get listSelector() { return "staff-list"; }
  protected override get subject() { return "le personnel"; }
  protected override get subjectPlural() { return "personnels"; }
  protected override get customColumns() {
    return [
      {
        ref: "function",
        label: "Fonction",
        visible: true,
      },
      {
        ref: "dateOfRecruitment",
        label: "Date de Recruitement",
        visible: false,
        filter: { datatype: "date" }
      },
    ];
  }
  
}
