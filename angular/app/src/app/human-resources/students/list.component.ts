import { Component } from '@angular/core';
import { ListComponent as PersonList } from '../generic/list.component';
import { MainParent } from './student.entity';

@Component({
  selector: 'student-list',
  templateUrl: '../generic/list.component.html',
})
export class ListComponent extends PersonList {

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
