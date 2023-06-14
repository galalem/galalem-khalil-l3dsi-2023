import { Component } from '@angular/core';
import { 
  dataTableColumnsFromDefault,
  StringUtils
} from 'ngx-core';
import { Page } from 'src/app/page/page.component';

@Component({
  selector: 'class-details',
  template: `
<ion-content>
  <div class="py-2">
    <app-alert #alert/>
    <data-table [source]="entity.students" [config]="dataTableConfig"/>
  </div>
</ion-content>
  `,
})
export class DetailsComponent extends Page<any> {

  entity:any = {
    students: []
  };
  students:any[] = [];

  override ngOnInit(): void {
    this.service.setUsesContext(null);
    this.init('schooling/classes', 'schooling/classes', 'class-list');
    super.ngOnInit();
    this.refresh();
  }

  refresh() {
    this.resource('schooling/classes');
    this.default().read(this.getRouteParam('id'), (response) => {
      this.entity = {...response, students: response.students.map((student:any) => { return {...student, firstName: "Chargement..." } })};
      this.dataTableConfig = {...this.dataTableConfig, title:`Liste des Élèves «${this.entity.name}»`};

      this.resource("human-resources/students?ids="+response.students.map((s:any) => s.id).join(','));
      this.browse().subscribe(res => {this.entity.students = this.entity.students.map((student:any) => { return {...student, ...res.find(s => s.id === student.id) } })})
      //this.detectChanges();
    });  
  }
  dataTableConfig = {
    title:"Liste des Élèves",
    columns: dataTableColumnsFromDefault({
      ref: "",
      label: "",
      visible: true,
      sortable: true
    },  [
      {
        ref: "id",
        label: "No."
      },
      {
        ref: "firstName",
        label: "Prénom"
      },
      {
        ref: "lastName",
        label: "Nom"
      },
      {
        ref: "group",
        label: "Groupe",
        display: function(value:number|null){ return `<span class="badge badge-pill bg-${value === null ? 'danger' : 'primary'} text-md font-weight-normal">${value === null ? 'aucun' : value}</span>` },

      }
    ]),
    selection: true,
    pagination:true,
    actions: {
      enabled:true,
      add:{enabled:false},
      delete:{enabled:false},
      import:{enabled:false},
      export:{enabled:false},
      actions: (item:any) => [
        {
          label: "Détails",
          icon: "eye",
          iconTheme: "primary",
          routerLink: [`/human-resources/students/${item.id}`]
        },
        {
          divider: true
        },
        {
          label: "Appeler",
          icon: "phone",
          iconTheme: "info",
          href: `tel:${item.phone}`,
          disabled: !item.phone
        },
        {
          label: "Envoyer un Email",
          icon: "envelope",
          iconTheme: "info",
          href: `mailto:${item.email}`,
          disabled: !item.email
        },
      ],
      selectionActions: (items:any[]) => {
        return [
          {
            label: "Envoyer un Email",
            icon: "envelope",
            iconTheme: "info",
            href: `mailto:${items.map(item => item.email).join(',')}`,
            disabled: items.map(item => StringUtils.isBlank(item.email)).reduce((prev, curr) => prev && curr)
          },
        ]
      }
    }
  };
}

