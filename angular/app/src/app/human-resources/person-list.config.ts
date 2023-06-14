import { dataTableColumnsFromDefault } from "../template/components/data-table/data-table.component";
import { DropdownMenuItem } from "../template/components/dropdown-menu/dropdown-menu.component";
import { MatDialog } from "@angular/material/dialog";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { isBlank } from "../utils/strings";
import { AlertDialogComponent as AlertDialog } from "../template/components/dialogs/alert-dialog/alert-dialog.component";
import { DeleteDialogComponent as DeleteDialog } from "../template/components/dialogs/delete-dialog/delete-dialog.component";
import { faBan, faBoxArchive, faDownload, faEnvelope, faEye, faPhone, faTrash } from "@fortawesome/free-solid-svg-icons";
import * as moment from "moment";

export function makeDataTableColumnsForPerson(customColumns: any[]) {
    moment.locale("fr");
    return dataTableColumnsFromDefault({
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
            
            ... customColumns
            
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
                display: function(value?:string){ if(value) return moment(value.replace('T', ' ')).format("dddd Do MMMM YYYY à HH:mm"); return '' },
                filter: { datatype: "date" }
            },
            {
                ref: "updatedAt",
                label: "Dernière mise à jour",
                visible: false,
                display: function(value?:string){ if(value) return moment(value.replace('T', ' ')).format("dddd Do MMMM YYYY à HH:mm"); return '' },
                filter: { datatype: "date" }
            }
        ]);
}

export function makeDataTableActionsForPerson(item:any, dialog:MatDialog, entity:string, subject:string,
    activeHandler:() => void, archiveHandler:() => void, deleteHandler:() => void):DropdownMenuItem[] {
    return [
        {
            label: "Détails",
            icon: faEye,
            iconTheme: "primary",
            routerLink: [`/human-resources/${entity}/${item.id}`]
        },
        {
            label: "Modifier",
            icon: faPenToSquare,
            iconTheme: "warning",
            routerLink: [`/human-resources/${entity}/${item.id}/edit`]
        },
        {
            divider: true
        },
        {
            label: "Appeler",
            icon: faPhone,
            iconTheme: "info",
            href: `tel:${item.phone}`,
            disabled: isBlank(item.phone)
        },
        {
            label: "Envoyer un Email",
            icon: faEnvelope,
            iconTheme: "info",
            href: `mailto:${item.email}`,
            disabled: isBlank(item.email)
        },
        {
            divider: true
        },
        {
            label: item.active ? "Désactiver" : "Activer",
            icon: faBan,
            theme: "indigo",
            onClick: () => { 
                dialog.open(AlertDialog, {
                    data: {
                        title: item.active ? "Désactiver" : "Activer",
                        body: `Êtes-vous sûr de bien vouloir ${item.active ? "désactiver" : "activer"} ${subject} <b>${item.firstName} ${item.lastName}</b>?`,
                        handler: activeHandler,
                    },
                }); 
            }
        },
        {
            label: item.archived ? "Désarchiver" : "Archiver",
            icon: faBoxArchive,
            theme: "fuchsia",
            onClick: () => { 
                dialog.open(AlertDialog, {
                data: {
                    title: item.archived ? "Désarchiver" : "Archiver",
                    body: `Êtes-vous sûr de bien vouloir ${item.archived ? "désarchiver" : "archiver"} ${subject} <b>${item.firstName} ${item.lastName}</b>?`,
                    handler: archiveHandler,
                },
                }); 
            }
        },
        {
            label: "Supprimer",
            icon: faTrash,
            theme: "danger",
            onClick: () => { 
                dialog.open(DeleteDialog, {
                    data: {
                        subject: `${subject} ${item.firstName} ${item.lastName} No. ${item.id}`,
                        handler: deleteHandler,
                    },
                }); 
            }
        },
    ] as DropdownMenuItem[];
}
export function makeDataTableSelectionActionsForPerson(items:any[], dialog:MatDialog, subject:string,
    activeHandler:() => void, archiveHandler:() => void, deleteHandler:() => void):DropdownMenuItem[] {
    let active = items.map(item => item.active as boolean).reduce((a, b) => a && b);
    let archived = items.map(item => item.archived as boolean).reduce((a, b) => a && b);
    return [
        {
            label: "Envoyer un Email",
            icon: faEnvelope,
            iconTheme: "info",
            href: `mailto:${items.map(item => item.email).join(',')}`,
            disabled: items.map(item => isBlank(item.email)).reduce((prev, curr) => prev && curr)
        },
        {
            divider: true
        },
        {
            label: active ? "Désactiver" : "Activer",
            icon: faBan,
            theme: "indigo",
            disabled: ![items.length, 0].includes(items.filter(item => item.active).length),
            onClick: () => { 
                dialog.open(AlertDialog, {
                    data: {
                        title: active ? "Désactiver" : "Activer",
                        body: `Êtes-vous sûr de bien vouloir ${active ? "désactiver" : "activer"} les <b>${items.length}</b> ${subject} sélectionnés ?`,
                        handler: activeHandler,
                    },
                }); 
            }
        },
        {
            label: archived ? "Désarchiver" : "Archiver",
            icon: faBoxArchive,
            theme: "fuchsia",
            disabled: ![items.length, 0].includes(items.filter(item => item.archived).length),
            onClick: () => { 
                dialog.open(AlertDialog, {
                data: {
                    title: archived ? "Désarchiver" : "Archiver",
                    body: `Êtes-vous sûr de bien vouloir ${archived ? "désarchiver" : "archiver"} les <b>${items.length}</b> ${subject} sélectionnés ?`,
                    handler: archiveHandler,
                },
                }); 
            }
        },
        {
            label: "Supprimer",
            icon: faTrash,
            theme: "danger",
            onClick: () => { 
                dialog.open(DeleteDialog, {
                    data: {
                        subject: `les ${items.length} ${subject} sélectionnés `,
                        handler: deleteHandler,
                    },
                }); 
            }
        },
    ] as DropdownMenuItem[];
}

export function makeDataTableConfig(dialog:MatDialog, customColumns: any[], 
    title:string, entity:string, label:string, subject:string,
    activeHandler:(item:any)=>void, archiveHandler:(item:any)=>void, deleteHandler:(item:any)=>void,
    selectionActiveHandler:(items:any[])=>void, selectionArchiveHandler:(items:any[])=>void, selectionDeleteHandler:(items:any[])=>void) {
    return {
        title:title,
        columns: makeDataTableColumnsForPerson(customColumns),
        selection: true,
        pagination:true,
        actions: {
            enabled:true,
            add:{
                enabled:true,
                routerLink: ['/human-resources/'+ entity +'/create']
            },
            delete:{
                enabled:true,
                subject: 'les '+ label +' sélectionnés'
            },
            import:{enabled:true},
            export:{enabled:true},
            actions: (item:any) => makeDataTableActionsForPerson(item, dialog, entity, subject, () => activeHandler(item), () => archiveHandler(item), () => deleteHandler(item)),
            selectionActions: (items:any[]) => makeDataTableSelectionActionsForPerson(items, dialog, label, () => selectionActiveHandler(items), () => selectionArchiveHandler(items), () => selectionDeleteHandler(items))
        }
    };
}