import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DropdownMenuItem } from '../../../components/dropdown-menu/dropdown-menu.component';
import * as StringUtils from '../../../utils/strings';
import * as DateUtils from '../../../utils/dates';
import { DataTableColumn } from '../../../components/data-table/data-table.core';
import { DeleteDialog } from '../../../components/dialogs copy/delete-dialog/delete-dialog.component';
import { AlertDialog } from '../../../components/dialogs copy/alert-dialog/alert-dialog.component';

@Component({
    selector: 'person-table',
    template: `
<data-table [source]="source" [config]="config"/>
<delete-dialog #deleteDialog *ngIf="!readonly"/>
<alert-dialog  #alertDialog  *ngIf="!readonly"/>
`
})
export class PersonTable {
    @ViewChild('deleteDialog', { static: true }) private deleteDialog!: DeleteDialog;
    @ViewChild('alertDialog' , { static: true }) private  alertDialog!: AlertDialog;

    @Input()
    source: any[] = [];
    config:any;

    @Output("delete")
    onDelete: EventEmitter<{ url: string }> = new EventEmitter;

    @Output("patch")
    onPatch: EventEmitter<{ url: string, status: string }> = new EventEmitter;

    
    @Input()
    set route(value:string) { this._route = value; this.updateConfig()}
    get route(): string { return this._route; }
    private _route: string = "";

    @Input()
    set subject(value:string) { this._subject = value; this.updateConfig()}
    get subject(): string { return this._subject; }
    private _subject: string = "";

    @Input()
    set subjects(value:string) { this._subjects = value; this.updateConfig()}
    get subjects(): string { return this._subjects; }
    private _subjects: string = "";

    @Input()
    set columns(value:DataTableColumn[]) { this._columns = value || []; this.updateConfig()}
    get columns(): DataTableColumn[] { return this._columns; }
    private _columns: DataTableColumn[] = [];

    @Input()
    set readonly(value:boolean) { this._readonly = value; this.updateConfig()}
    get readonly(): boolean { return this._readonly; }
    private _readonly: boolean = true;

    updateConfig(): any {
        this.config = {
            title: 'Liste des ' + this.subjects.charAt(0).toUpperCase() + this.subjects.substring(1),
            columns: [
                {
                    ref: "id",
                    label: "No.",
                    visible: true,
                    sortable: true,
                    filter: { datatype: "number" }
                },
                {
                    ref: "code",
                    label: "Code",
                    visible: true,
                    sortable: true,
                    filter: { datatype: "string" }
                },
                {
                    ref: "firstName",
                    label: "Prénom",
                    visible: true,
                    sortable: true,
                    filter: { datatype: "string" }
                },
                {
                    ref: "lastName",
                    label: "Nom",
                    visible: true,
                    sortable: true,
                    filter: { datatype: "string" }
                },
                {
                    ref: "email",
                    label: "Email",
                    visible: false,
                    sortable: true,
                    filter: { datatype: "string" }
                },
                {
                    ref: "phone",
                    label: "Téléphone",
                    visible: false,
                    sortable: true,
                    filter: { datatype: "string" }
                },
                ... this.columns
                ,
                {
                    ref: "active",
                    label: "Activé",
                    visible: false,
                    sortable: false,
                    display: function (value: boolean) { return `<span class="badge badge-pill bg-${value ? 'success' : 'danger'} text-md font-weight-normal">${value ? 'oui' : 'non'}</span>` },
                    filter: { datatype: "boolean", init: true, checkbox: { labelOn: "activé", labelOff: "désactivé", labelIn: "ignoré" } }
                },
                {
                    ref: "archived",
                    label: "Archivé",
                    visible: false,
                    sortable: false,
                    display: function (value: boolean) { return `<span class="badge badge-pill bg-${value ? 'success' : 'danger'} text-md font-weight-normal">${value ? 'oui' : 'non'}</span>` },
                    filter: { datatype: "boolean", init: false, checkbox: { labelOn: "archivé", labelOff: "désarchivé", labelIn: "ignoré" } },
                },
                {
                    ref: "createdAt",
                    label: "Date de Création",
                    visible: false,
                    sortable: true,
                    display: function (value?: string) { if (value) return DateUtils.format(value.replace('T', ' '), "dddd Do MMMM YYYY à HH:mm"); return '' },
                    filter: { datatype: "date" }
                },
                {
                    ref: "updatedAt",
                    label: "Dernière mise à jour",
                    visible: false,
                    sortable: true,
                    display: function (value?: string) { if (value) return DateUtils.format(value.replace('T', ' '), "dddd Do MMMM YYYY à HH:mm"); return '' },
                    filter: { datatype: "date" }
                }
            ],
            selection: true,
            pagination: true,
            actions: {
                enabled: true,
                add: { enabled: false },
                import: { enabled: false },
                export: { enabled: false },
                delete: { enabled: false },
                actions: (item: any) =>
                    [
                        {
                            label: "Détails",
                            icon: "eye",
                            iconTheme: "primary",
                            routerLink: [`${this.route}/${item.id}`]
                        },
                        ...(this.readonly ? [] : [
                            {
                                label: "Modifier",
                                icon: "pen-to-square",
                                iconTheme: "warning",
                                routerLink: [`${this.route}/${item.id}/edit`]
                            }]),
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
                        ...(this.readonly ? [] : [
                            {
                                divider: true
                            },
                            {
                                label: item.active ? "Désactiver" : "Activer",
                                icon: "ban",
                                theme: "indigo",
                                onClick: () => {
                                    this.alertDialog.open({
                                        title: item.active ? "Désactiver" : "Activer",
                                        body: `Êtes-vous sûr de bien vouloir ${item.active ? "désactiver" : "activer"} ${this.subject} <b>${item.firstName} ${item.lastName} N°${item.id}</b>?`,
                                        handler: () => this.onPatch.emit({ url: `${item.id}/${item.active ? "deactivate" : "activate"}`, status: `${item.active ? "Désactiver" : "Activer"}` }),
                                    });
                                }
                            },
                            {
                                label: item.archived ? "Désarchiver" : "Archiver",
                                icon: "box-archive",
                                theme: "fuchsia",
                                onClick: () => {
                                    this.alertDialog.open({
                                        title: item.archived ? "Désarchiver" : "Archiver",
                                        body: `Êtes-vous sûr de bien vouloir ${item.archived ? "désarchiver" : "archiver"} ${this.subject} <b>${item.firstName} ${item.lastName} N°${item.id}</b>?`,
                                        handler: () => this.onPatch.emit({ url: `${item.id}/${item.archived ? "unarchive" : "archive"}`, status: `${item.archived ? "Désarchivé" : "Archivé"}` }),
                                    });
                                }
                            },
                            {
                                label: "Supprimer",
                                icon: "trash",
                                theme: "danger",
                                onClick: () => this.deleteDialog.open({
                                    subject: `${this.subject} <b>${item.firstName} ${item.lastName} N°${item.id}</b>`,
                                    handler: () => this.onDelete.emit({ url: '' + item.id }),
                                })
                            }])
                    ] as DropdownMenuItem[],
                selectionActions: (items: any[]) => {
                    let active = items.map(item => item.active as boolean).reduce((a, b) => a && b);
                    let archived = items.map(item => item.archived as boolean).reduce((a, b) => a && b);
                    return [
                        {
                            label: "Envoyer un Email",
                            icon: "envelope",
                            iconTheme: "info",
                            href: `mailto:${items.map(item => item.email).join(',')}`,
                            disabled: items.map(item => StringUtils.isBlank(item.email)).reduce((prev, curr) => prev && curr)
                        },
                        ...(this.readonly ? [] : [
                            {
                                divider: true
                            },
                            {
                                label: active ? "Désactiver" : "Activer",
                                icon: "ban",
                                theme: "indigo",
                                onClick: () => {
                                    this.alertDialog.open({
                                        title: active ? "Désactiver" : "Activer",
                                        body: `Êtes-vous sûr de bien vouloir ${active ? "désactiver" : "activer"} les <b>${items.length} ${this.subjects} sélectionnés</b>?`,
                                        handler: () => this.onPatch.emit({ url: `${active ? "deactivate" : "activate"}?ids=${items.map(item => item.id).join(',')}`, status: `${active ? "Désactiver" : "Activer"}`}),
                                    });
                                }
                            },
                            {
                                label: archived ? "Désarchiver" : "Archiver",
                                icon: "box-archive",
                                theme: "fuchsia",
                                onClick: () => {
                                    this.alertDialog.open({
                                        title: archived ? "Désarchiver" : "Archiver",
                                        body: `Êtes-vous sûr de bien vouloir ${archived ? "désarchiver" : "archiver"} les <b>${items.length} ${this.subjects} sélectionnés</b>?`,
                                        handler: () => this.onPatch.emit({ url: `${archived ? "unarchive" : "archive"}?ids=${items.map(item => item.id).join(',')}`, status: `${archived ? "Désarchivé" : "Archivé"}`}),
                                    });
                                }
                            },
                            {
                                label: "Supprimer",
                                icon: "trash",
                                theme: "danger",
                                onClick: () => {
                                    this.deleteDialog.open({
                                        subject: `les ${items.length} ${this.subjects} sélectionnés`,
                                        handler: () => this.onDelete.emit({ url: `delete?ids=${items.map(item => item.id).join(',')}`}),
                                    });
                                }
                            }])
                    ] as DropdownMenuItem[];
                }
            }
        };
    }
}
