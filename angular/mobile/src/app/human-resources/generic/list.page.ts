import { Component } from '@angular/core';
import { 
  DropdownMenuItem,
  dataTableColumnsFromDefault,
  DateUtils,
  StringUtils,
} from 'ngx-core';
import { Page } from 'src/app/page/page.component';

@Component({
  selector: 'person-list',
  template: '<p>Can not use this directly</p>',
})
export abstract class PersonList extends Page<any> {
  
  list:any[]=[];
  dataTableConfig:any;

  protected abstract get ref():string;
  protected abstract get listSelector():string;
  protected abstract get subject():string;
  protected abstract get subjectPlural():string;
  protected abstract get customColumns():any[];

  override ngOnInit(): void {
    this.init('human-resources/' + this.ref, 'human-resources/' + this.ref, this.listSelector);
    this.dataTableConfig = this.getDataTableConfig();
    this.refresh();
    super.ngOnInit();
  }

  refresh() {
    this.browse().subscribe((response) => {this.list = response;});
  }

  private getDataTableConfig(){
    return {
      title:'Liste des ' + this.subjectPlural.charAt(0).toUpperCase() + this.subjectPlural.substring(1),
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
          ref: "email",
          label: "Email",
          visible: false
        },
        {
          ref: "phone",
          label: "Téléphone",
          visible: false
        },
        ... this.customColumns
        ,
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
        },
        {
          ref: "createdAt",
          label: "Date de Création",
          visible: false,
          display: function(value?:string){ if(value) return DateUtils.format(value.replace('T', ' '), "dddd Do MMMM YYYY à HH:mm"); return '' },
          filter: { datatype: "date" }
        },
        {
          ref: "updatedAt",
          label: "Dernière mise à jour",
          visible: false,
          display: function(value?:string){ if(value) return DateUtils.format(value.replace('T', ' '), "dddd Do MMMM YYYY à HH:mm"); return '' },
          filter: { datatype: "date" }
        }
      ]),
      selection: true,
      pagination:true,
      actions: {
        enabled:true,
        add:{enabled:false},
        import:{enabled:false},
        export:{enabled:false},
        delete:{enabled:false},
        actions: (item:any) => [
          {
            label: "Détails",
            icon: "eye",
            iconTheme: "primary",
            routerLink: [`/human-resources/${this.ref}/${item.id}`]
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
        ] as DropdownMenuItem[],
        selectionActions: (items:any[]) => {
          return [
            {
              label: "Envoyer un Email",
              icon: "envelope",
              iconTheme: "info",
              href: `mailto:${items.map(item => item.email).join(',')}`,
              disabled: items.map(item => StringUtils.isBlank(item.email)).reduce((prev, curr) => prev && curr)
            },
          ] as DropdownMenuItem[];
        }
      }
    };
  }
}
