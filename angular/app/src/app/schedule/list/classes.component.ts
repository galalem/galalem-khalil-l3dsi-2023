import { Component } from '@angular/core';
import { ListComponent } from './list.component';
import { DataTableColumn } from 'ngx-core';

@Component({
  selector: 'app-schedule-classes-list',
  templateUrl: './list.component.html',
})
export class ClassListComponent extends ListComponent {

  override refresh(): void {
    this.resource('schooling/classes?period=' + this.context.period);
    this.browse().subscribe(response => {
      this.list = response;
    });
  }

  override get title(): string {
    return "Liste des Classes";
  }
  override get columns(): DataTableColumn[] {
    return [
      {
        ref: "id",
        label: "No.",
        sortable: true,
        visible: true,
        filter: {
          datatype: "number",
        }
      },
      {
        ref: "name",
        label: "Nom",
        sortable: true,
        visible: true,
        filter: {
          datatype: "string",
        }
      },
      {
        ref: "level",
        label: "Niveau",
        sortable: true,
        visible: true,
        filter: {
          datatype: "string",
        }
      },
      {
        ref: "students",
        label: "Nombre des élèves",
        sortable: true,
        visible: true,
        filter: {
          datatype: "number",
        }
      },
    ]
  }
  override get scheduleRoute(): string {
    return "/schedule/classes";
  }

}
