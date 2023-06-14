import { Component } from '@angular/core';
import { ListComponent } from './list.component';
import { DataTableColumn } from 'ngx-core';

@Component({
  selector: 'app-schedule-places-list',
  templateUrl: './list.component.html',
})
export class PlaceListComponent extends ListComponent {

  override refresh(): void {
    this.resource('schooling/'+this.context.period+'/sessions/places');
    this.browse().subscribe(result => {
      this.list = result.map((value:string) => ({place:value, id:value}));
    })
  }

  override get label(): string {
    return "Liste des Salles";
  }
  override get columns(): DataTableColumn[] {
    return [
      {
        ref: "place",
        label: "Salle",
        sortable: true,
        visible: true,
        filter: {
          datatype: "string",
          classes: "col-12"
        }
      }
    ]
  }
  override get scheduleRoute(): string {
    return "/schedule/places";
  }

}
