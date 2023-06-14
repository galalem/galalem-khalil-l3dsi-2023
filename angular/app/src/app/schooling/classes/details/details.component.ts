import { Component } from '@angular/core';
import { 
  dataTableColumnsFromDefault, 
  AlertDialogComponent as AlertDialog, 
  DeleteDialogComponent as DeleteDialog, 
  InfoDialogComponent as InfoDialog,
  DataTableDialogComponent as TableDialog, 
  StringUtils
} from 'ngx-core';
import { PageComponent } from 'src/app/template/page/page.component';
import { UnassignDialogComponent as UnassignDialog } from './unassign-dialog.component';

@Component({
  selector: 'class-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent extends PageComponent<any> {

  entity:any = {
    students: []
  };
  students:any[] = [];

  override ngOnInit(): void {
    this.service.setUsesContext(null);

    this.resource("human-resources/students")
    this.browse().subscribe(response => {this.students = response; this.refresh()})
    this.init('schooling/classes', 'schooling/classes', 'class-list');
    super.ngOnInit();
  }

  refresh() {
    this.resource('schooling/classes');
    this.default().read(this.getRouteParam('id'), (response) => {
      this.entity = {...response, students: response.students.map((student:any) => { return {...student, ...this.students.find(s => s.id === student.id) } })};
      this.dataTableConfig = {...this.dataTableConfig, title:`Liste des Élèves «${this.entity.name}»`};
      this.detectChanges();
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
      add:{
        enabled:true,
        label: "Affecter",
        onClick: () => this.showStudentsDialog()
      },
      delete:{enabled:false},
      import:{enabled:false},
      export:{enabled:false},
      actions: (item:any) => [
        {
          label: "Détails",
          icon: this.ViewIcon,
          iconTheme: "primary",
          routerLink: [`/human-resources/students/${item.id}`]
        },
        {
          divider: true
        },
        {
          label: "Appeler",
          icon: this.PhoneIcon,
          iconTheme: "info",
          href: `tel:${item.phone}`,
          disabled: !item.phone
        },
        {
          label: "Envoyer un Email",
          icon: this.EmailIcon,
          iconTheme: "info",
          href: `mailto:${item.email}`,
          disabled: !item.email
        },
        {
          divider: true
        },
        {
          label: "Associer Groupe",
          icon: "user-group",
          iconTheme: "indigo"
        },
        {
          divider: true
        },
        {
          label: "Désaffecter",
          icon: "user-slash",
          theme: "danger",
          onClick: () => this.dialog.open(UnassignDialog, {
            data: {
              subject: "l'élève «" + item.firstName + " " + item.lastName + "»",
              handler: () => {
                this.http.resource('schooling/classes/' + this.getRouteParam('id')).delete("students?ids=" + item.id).subscribe(() => this.refresh());
                this.http.resource('schooling/classes');
              },
            },
          })
        }
      ],
      selectionActions: (items:any[]) => {
        return [
          {
            label: "Envoyer un Email",
            icon: this.EmailIcon,
            iconTheme: "info",
            href: `mailto:${items.map(item => item.email).join(',')}`,
            disabled: items.map(item => StringUtils.isBlank(item.email)).reduce((prev, curr) => prev && curr)
          },
          {
            divider: true
          },
          {
            label: "Associer Groupe",
            icon: "user-group",
            iconTheme: "indigo"
          },
          {
            divider: true
          },
          {
            label: "Désaffecter",
            icon: "user-slash",
            theme: "danger",
            onClick: () => this.dialog.open(UnassignDialog, {
              data: {
                subject: "les " + items.length + " élèves séléctionnés",
                handler: () => {
                  let ids = items.map(item => item.id).join(",");
                  this.http.resource('schooling/classes/' + this.getRouteParam('id')).delete("students?ids=" + ids).subscribe(() => this.refresh());
                  this.http.resource('schooling/classes');
                },
              },
            })
          },
        ]
      }
    }
  };

  showStudentsDialog() {
    this.dialog.open(TableDialog, {
      data: {
        data:this.students.filter(student => !this.entity.students.some((s:any) => s.id === student.id)),
        title:"Affecter des Élèves",
        columns: dataTableColumnsFromDefault({
          ref: "",
          label: "",
          visible: true,
          sortable: true,
          filter: {
            datatype: "string"
          }
        },  
        [
          {
            ref: "id",
            label: "No.",
            filter: { datatype: "number" }
          },
          {
            ref: "code",
            label: "Code",
            visible: false
          },
          {
            ref: "firstName",
            label: "Prénom",
          },
          {
            ref: "lastName",
            label: "Nom"
          },
          {
            ref: "active",
            label: "Activé",
            visible: false,
            sortable: false,
            display: function(value:boolean){ return `<span class="badge badge-pill bg-${value ? 'success' : 'danger'} text-md font-weight-normal">${value ? 'oui' : 'non'}</span>` },
            filter: { datatype: "boolean", init: true, checkbox: { labelOn: "activé", labelOff: "désactivé", labelIn: "ignoré" } }
          },
          {
            ref: "archived",
            label: "Archivé",
            visible: false,
            sortable: false,
            display: function(value:boolean){ return `<span class="badge badge-pill bg-${value ? 'success' : 'danger'} text-md font-weight-normal">${value ? 'oui' : 'non'}</span>` },
            filter: { datatype: "boolean", init: false, checkbox: { labelOn: "archivé", labelOff: "désarchivé", labelIn: "ignoré" } },
          }
        ]),
      
        multipleSelection:true,
        pagination:true,
      
        onSelect: (value:any[]) => {
          let ids = value.map(item => item.id).join(",");
          this.http.resource('schooling/classes/' + this.getRouteParam('id') + "/students?ids=" + ids).add({}).subscribe(() => this.refresh());
          this.http.resource('schooling/classes');
        }
      }
    });
  }
}

