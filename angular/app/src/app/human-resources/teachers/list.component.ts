import { Component } from '@angular/core';
import { ListComponent as PersonList } from '../generic/list.component';

@Component({
  selector: 'teacher-list',
  templateUrl: '../generic/list.component.html',
})
export class ListComponent extends PersonList {

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
