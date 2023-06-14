import { Component } from '@angular/core';
import { Teacher } from 'ngx-core';
import { Page } from 'src/app/page/page.component';

@Component({
  selector: 'subject-list',
  template: `
<ion-content>
  <div class="py-2">
    <app-alert #alert></app-alert>
    
    <a class="btn btn-default btn-lg btn-block mb-3" href="schedule/classes/{{id}}" target="_blank">
      <ngx-fa-icon icon="calendar-days"></ngx-fa-icon> &nbsp;
      Voir l'emploi de temps de cette classe
    </a>
    
    <data-table [source]="list" [config]="dataTableConfig"></data-table>
  </div>
</ion-content>
  `
})
export class ListComponent extends Page<any> {

  id: number = 0;
  entity: any = {};
  list: any[] = [];
  teachers: Teacher[] = [];
  dataTableConfig: any;

  override ngOnInit() {
    this.service.setUsesContext(null);

    this.id = parseInt(this.getRouteParam('id'));
    this.init('schooling/classes', 'schooling/classes/' + this.id + '/subjects', 'subject-list');
    this.dataTableConfig = this.getDataTableConfig();

    this.resource("human-resources/teachers")
    this.browse().subscribe(response => { this.teachers = response; this.refresh() })

    super.ngOnInit();
  }

  refresh() {
    this.resource('schooling/classes?ids=' + this.id);
    this.browse().subscribe((response) => {
      this.entity = response[0];
      this.dataTableConfig = { ...this.dataTableConfig, title: `Liste des Matières «${this.entity.name}»` };
      this.resource('schooling/subjects?class=' + this.id);
      this.browse().subscribe((subjects) => {        
        this.list = subjects.map(s => ({ ...s, teacher: Teacher.copy(this.teachers.find(t => t.id == s.teacherId) || new Teacher) }));
      })
    });
  }

  private getDataTableConfig() {
    return {
      title: "Liste des Matières",
      columns: [
        {
          ref: "id",
          label: "No.",
          visible: false,
          sortable: true,
          filter: {
            datatype: "number"
          }
        },
        {
          ref: "label",
          label: "Libelle",
          visible: true,
          sortable: true,
          filter: {
            datatype: "string"
          }
        },
        {
          ref: "color",
          label: "Couleur",
          visible: true,
          sortable: false,
        },
        {
          ref: "teacher",
          label: "Enseignant",
          display: function (value: Teacher) { return value?.name() },
          visible: true,
          sortable: false,
        },
        {
          ref: "shared",
          label: "Étudiée Par",
          visible: false,
          sortable: false,
          display: function (value: boolean) { return `<span class="badge badge-pill bg-${value ? 'success' : 'danger'} text-md font-weight-normal">${value ? 'Toute la classe' : 'Élèves spécifiques'}</span>` },
          filter: { datatype: "boolean", checkbox: { labelOn: "Toute la classe", labelOff: "Élèves spécifiques", labelIn: "ignoré" } }
        },
      ],
      selection: false,
      pagination: true,
      actions: {
        enabled: true,
        add: { enabled: false},
        delete: { enabled: false },
        import: { enabled: false },
        export: { enabled: false },
        actions: (item: any) => [
          {
            label: 'Détails',
            icon: 'eye',
            iconTheme: 'primary',
            routerLink: [`${item.id}`]
          }
        ],
        selectionActions: (items: any[]) => []
      }
    };
  }
}
