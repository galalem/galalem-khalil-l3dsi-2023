import { Component } from '@angular/core';
import { 
  AlertDialogComponent as AlertDialog,
  DeleteDialogComponent as DeleteDialog,
  DropdownMenuItem,
  dataTableColumnsFromDefault,
  DateUtils,
  StringUtils
} from 'ngx-core';
import { PageComponent } from 'src/app/template/page/page.component';

@Component({
  selector: 'person-list',
  template: '<p>Can not use this directly</p>',
})
export abstract class ListComponent extends PageComponent<any> {
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
        add:{
          enabled:true,
          routerLink: [`/human-resources/${this.ref}/create`]
        },
        import:{enabled:true},
        export:{enabled:true},
        actions: (item:any) => [
          {
            label: "Détails",
            icon: this.ViewIcon,
            iconTheme: "primary",
            routerLink: [`/human-resources/${this.ref}/${item.id}`]
          },
          {
            label: "Modifier",
            icon: this.EditIcon,
            iconTheme: "warning",
            routerLink: [`/human-resources/${this.ref}/${item.id}/edit`]
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
            label: item.active ? "Désactiver" : "Activer",
            icon: "ban",
            theme: "indigo",
            onClick: () => { 
              this.dialog.open(AlertDialog, {
                data: {
                  title: item.active ? "Désactiver" : "Activer",
                  body: `Êtes-vous sûr de bien vouloir ${item.active ? "désactiver" : "activer"} ${this.subject} <b>${item.firstName} ${item.lastName} N°${item.id}</b>?`,
                  handler: () => this.default().patch(`${item.id}/${item.active ? "deactivate" : "activate"}`, undefined, `${item.active ? "Désactiver" : "Activer"}`, () => this.refresh()),
                },
              }); 
            }
          },
          {
            label: item.archived ? "Désarchiver" : "Archiver",
            icon: "box-archive",
            theme: "fuchsia",
            onClick: () => { 
              this.dialog.open(AlertDialog, {
                data: {
                  title: item.archived ? "Désarchiver" : "Archiver",
                  body: `Êtes-vous sûr de bien vouloir ${item.archived ? "désarchiver" : "archiver"} ${this.subject} <b>${item.firstName} ${item.lastName} N°${item.id}</b>?`,
                  handler: () => this.default().patch(`${item.id}/${item.archived ? "unarchive" : "archive"}`, undefined, `${item.archived ? "Désarchivé" : "Archivé"}`, () => this.refresh()),
                },
              }); 
            }
          },
          {
            label: "Supprimer",
            icon: this.DeleteIcon,
            theme: "danger",
            onClick: () => { 
              this.dialog.open(DeleteDialog, {
                data: {
                  subject: `${this.subject} ${item.firstName} ${item.lastName} N°${item.id}`,
                  handler: () => this.default().delete(item.id, () => this.refresh()),
                },
              }); 
            }
          },
        ] as DropdownMenuItem[],
        selectionActions: (items:any[]) => {
          let active = items.map(item => item.active as boolean).reduce((a, b) => a && b);
          let archived = items.map(item => item.archived as boolean).reduce((a, b) => a && b);
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
              label: active ? "Désactiver" : "Activer",
              icon: "ban",
              theme: "indigo",
              onClick: () => { 
                this.dialog.open(AlertDialog, {
                  data: {
                    title: active ? "Désactiver" : "Activer",
                    body: `Êtes-vous sûr de bien vouloir ${active ? "désactiver" : "activer"} les <b>${items.length} ${this.subjectPlural} sélectionnés</b>?`,
                    handler: () => this.default().patch(`${active ? "deactivate" : "activate"}?ids=${items.map(item => item.id).join(',')}`, undefined, `${active ? "Désactiver" : "Activer"}`, () => this.refresh()),
                  },
                }); 
              }
            },
            {
              label: archived ? "Désarchiver" : "Archiver",
              icon: "box-archive",
              theme: "fuchsia",
              onClick: () => { 
                this.dialog.open(AlertDialog, {
                  data: {
                    title: archived ? "Désarchiver" : "Archiver",
                    body: `Êtes-vous sûr de bien vouloir ${archived ? "désarchiver" : "archiver"} les <b>${items.length} ${this.subjectPlural} sélectionnés</b>?`,
                    handler: () => this.default().patch(`${archived ? "unarchive" : "archive"}?ids=${items.map(item => item.id).join(',')}`, undefined, `${archived ? "Désarchivé" : "Archivé"}`, () => this.refresh()),
                  },
                }); 
              }
            },
            {
              label: "Supprimer",
              icon: this.DeleteIcon,
              theme: "danger",
              onClick: () => { 
                this.dialog.open(DeleteDialog, {
                  data: {
                    subject: `les ${items.length} ${this.subjectPlural} sélectionnés`,
                    handler: () => this.default().delete(`delete?ids=${items.map(item => item.id).join(',')}`, () => this.refresh()),
                  },
                }); 
              }
            },
          ] as DropdownMenuItem[];
        }
      }
    };
  }
}
