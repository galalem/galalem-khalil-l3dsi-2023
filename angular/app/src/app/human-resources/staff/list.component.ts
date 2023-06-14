import { Component } from '@angular/core';
import { ListComponent as PersonList } from '../generic/list.component';

@Component({
  selector: 'staff-list',
  templateUrl: '../generic/list.component.html',
})
export class ListComponent extends PersonList {
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
