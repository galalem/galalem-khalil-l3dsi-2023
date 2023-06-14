import { Component } from '@angular/core';
import { ListComponent } from './list.component';
import { DataTableColumn } from 'ngx-core';

@Component({
  selector: 'app-schedule-teachers-list',
  templateUrl: './list.component.html',
})
export class TeacherListComponent extends ListComponent {

  override refresh(): void {
    this.resource('schooling/'+this.context.period+'/sessions/teachers');
    this.browse().subscribe((ids:number[]) => {
      if (ids?.length){        
        this.resource('human-resources/teachers?ids='+ids.join(','));
        this.browse().subscribe(result => {
          this.list = result;
        })
      } else this.list = [];
    })
  }

  override get label(): string {
    return "Liste des Enseignants";
  }
  override get columns(): DataTableColumn[] {
    return [
      {
        ref: "id",
        label: "No.",
        sortable: true,
        visible: true,
        filter: { datatype: "number" }
      },
      {
        ref: "code",
        label: "Code",
        sortable: true,
        visible: false,
        filter: { datatype: "string" }
      },
      {
        ref: "firstName",
        label: "Prénom",
        sortable: true,
        visible: true,
        filter: { datatype: "string" }
      },
      {
        ref: "lastName",
        label: "Nom",
        sortable: true,
        visible: true,
        filter: { datatype: "string" }
      },
    ]
  }
  override get scheduleRoute(): string {
    return "/schedule/teachers";
  }

}
