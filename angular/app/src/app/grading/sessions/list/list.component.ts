import { Component } from '@angular/core';
import { DataTableConfig } from 'ngx-core';
import { PageComponent } from 'src/app/template/page/page.component';

@Component({
  selector: 'grading-sessions-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends PageComponent<any> {

  list:any[] = [];

  override ngOnInit(): void {
    this.service.setUsesContext(true);
    this.init('schooling/evaluations', 'grading/sessions', 'grading-sessions-list');
    this.service.context.subscribe(ctx => {
      this.resource('schooling/evaluations?period='+ctx.period);
      this.browse().subscribe(response => { this.list = response; console.log(response);})
    })
    super.ngOnInit();
  }

  dataTableConfig:DataTableConfig = {
      title: "Liste des Sessions d'Évaluation",
      columns: [
        {
          ref: "id",
          label: "No.",
          visible: false,
          sortable: true,
        },
        {
          ref: "label",
          label: "Libelle",
          visible: true,
          sortable: true,
        },
        {
          ref: "start",
          label: "Date début",
          visible: false,
          sortable: true,
        },
        {
          ref: "end",
          label: "Date fin",
          visible: false,
          sortable: true,
        },
        {
          ref: "deadline",
          label: "Date limite de remise des notes",
          visible: false,
          sortable: true,
        },
      ],
      selection: false,
      pagination: true,
      actions: {
        enabled: true,
        add: {enabled: false},
        delete: { enabled: false },
        import: { enabled: false },
        export: { enabled: false },
        actions: (item: any) => [
          {
            label: "Modifier",
            icon: this.EditIcon,
            iconTheme: "warning",
            routerLink: [`/grading/sessions/${item.id}/edit`]
          },
          {
            divider: true
          },
          {
            label: "Avancement par Enseignant",
            icon: 'user-tie',
            iconTheme: "info",
            routerLink: [`/grading/sessions/${item.id}/progress/teachers`]
          },
          {
            label: "Avancement par Élève",
            icon: 'user-graduate',
            iconTheme: "info",
            routerLink: [`/grading/sessions/${item.id}/progress/students`]
          },
        ],
        selectionActions: (items: any[]) => {
          return []
        }
      }
    };
  
}
