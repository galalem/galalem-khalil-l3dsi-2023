import { Component } from '@angular/core';
import { ListComponent as PersonList } from '../generic/list.component';

@Component({
  selector: 'parent-list',
  templateUrl: '../generic/list.component.html',
})
export class ListComponent extends PersonList {

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
