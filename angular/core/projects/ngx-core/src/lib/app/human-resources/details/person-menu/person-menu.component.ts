import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Person } from '../../entities/person.entity';
import { DropdownMenuItem } from '../../../../components/dropdown-menu/dropdown-menu.component';
import { AlertDialog } from '../../../../components/dialogs copy/alert-dialog/alert-dialog.component';
import { DeleteDialog } from '../../../../components/dialogs copy/delete-dialog/delete-dialog.component';

@Component({
    selector: 'person-menu',
    templateUrl: './person-menu.component.html',
})
export class PersonMenu {

    @ViewChild('deleteDialog') private deleteDialog!: DeleteDialog;
    @ViewChild('alertDialog' ) private  alertDialog!: AlertDialog;

    actions: DropdownMenuItem[] = [];

    private _readonly: boolean = true;
    private _profile: string = "";
    private _subject: string = "";
    private _person: Person = new Person;

    @Input()
    set subject(value: string) {
        this._subject = value;
        this.setActions();
    }
    get subject(): string {
        return `${this._subject} <b>${this._person.firstName} ${this._person.lastName} N°${this._person.id}</b>`;
    }

    @Input()
    set person(value: Person) {
        console.log(value)
        this._person = value;
        this.setActions();
    }

    get person(): Person {
        return this._person;
    }

    @Input()
    set readonly(value: boolean) {
        this._readonly = value;
        this.setActions();
    }

    get readonly(): boolean {
        return this._readonly;
    }

    @Input()
    set profile(value: string) {
        this._profile = value;
        this.setActions();
    }

    get profile(): string {
        return this._profile;
    }

    @Output("delete")
    onDelete: EventEmitter<{url:string}> = new EventEmitter;

    @Output("patch")
    onPatch: EventEmitter<{url:string, status:string}> = new EventEmitter;

    setActions() {
        this.actions = [
            {
                label: "Imprimer",
                icon: "print",
                iconTheme: "primary",
                onClick: () => window.print()
            },
            ...(this.readonly ? [] : [
            {
                divider: true
            },
            {
                label: "Modifier",
                icon: "pen-to-square",
                iconTheme: "warning",
                routerLink: [`${this.profile}/${this.person.id}/edit`]
            }]),
            {
                divider: true
            },
            {
                label: "Appeler",
                icon: "phone",
                iconTheme: "info",
                href: `tel:${this.person.phone}`,
                disabled: !this.person.phone
            },
            {
                label: "Envoyer un Email",
                icon: "envelope",
                iconTheme: "info",
                href: `mailto:${this.person.email}`,
                disabled: !this.person.email
            },
            ...(this.readonly ? [] : [
            {
                divider: true
            },
            {
                label: this.person.active ? "Désactiver" : "Activer",
                icon: "ban",
                theme: "indigo",
                onClick: () => {
                    this.alertDialog.open({
                        title: this.person.active ? "Désactiver" : "Activer",
                        body: `Êtes-vous sûr de bien vouloir ${this.person.active ? "désactiver" : "activer"} ${this.subject}?`,
                        handler: () => this.onPatch.emit({url: `${this.person.id}/${this.person.active ? "deactivate" : "activate"}`, status: `${this.person.active ? "Désactiver" : "Activer"}`}),
                    });
                }
            },
            {
                label: this.person.archived ? "Désarchiver" : "Archiver",
                icon: "box-archive",
                theme: "fuchsia",
                onClick: () => {
                    this.alertDialog.open({
                        title: this.person.archived ? "Désarchiver" : "Archiver",
                        body: `Êtes-vous sûr de bien vouloir ${this.person.archived ? "désarchiver" : "archiver"} ${this.subject}?`,
                        handler: () => this.onPatch.emit({url: `${this.person.id}/${this.person.archived ? "unarchive" : "archive"}`, status: `${this.person.archived ? "Désarchivé" : "Archivé"}`}),
                    });
                }
            },
            {
                label: "Supprimer",
                icon: "trash",
                theme: "danger",
                onClick: () => this.deleteDialog.open({
                    subject: this.subject,
                    handler: () => this.onDelete.emit({url: ''+this.person.id}),
                })
            }])
        ];
    }
}