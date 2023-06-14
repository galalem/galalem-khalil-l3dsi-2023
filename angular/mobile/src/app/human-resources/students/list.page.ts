import { Component } from '@angular/core';
import { MainParent } from 'ngx-core';
import { PersonList } from '../generic/list.page';

@Component({
  selector: 'student-list',
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

  protected get ref() { return "students"; }
  protected get listSelector() { return "student-list"; }
  protected get subject() { return "l'élève"; }
  protected get subjectPlural() { return "élèves"; }
  protected get customColumns() {
    return [
      {
        ref: "Parent Principal",
        label: "Fonction",
        visible: false,
        display: function (value: MainParent) {
          let theme = "";
          let label = "";
          switch (value) {
            case MainParent.FATHER:
              theme = "primary"; label = "Père"; break;
            case MainParent.MOTHER:
              theme = "danger"; label = "Mère"; break;
            case MainParent.TUTOR:
              theme = "warning"; label = "Tuteur"; break;
          }
          return `<span class="badge badge-pill bg-${theme} text-md font-weight-normal">${label}</span>`
        },
      }
    ];
  }
}
