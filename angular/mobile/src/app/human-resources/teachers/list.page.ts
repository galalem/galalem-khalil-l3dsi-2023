import { Component } from '@angular/core';
import { PersonList } from '../generic/list.page';

@Component({
  selector: 'teacher-list',
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
  
  protected override get ref() { return "teachers" }
  protected override get listSelector() { return "teacher-list" }
  protected override get subject() { return "l'enseignants" }
  protected override get subjectPlural() { return "enseignants" }
  protected override get customColumns() {
    return [
      {
        ref: "rank",
        label: "Grade",
        visible: false,
      },
      {
        ref: "dateOfRecruitment",
        label: "Date de Recruitement",
        visible: false,
        filter: { datatype: "date" }
      },
    ]
  };
}
