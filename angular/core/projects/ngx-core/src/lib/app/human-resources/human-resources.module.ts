import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesModule } from '../../components/images/image.module';
import { IconsModule } from '../../components/icons/icons.module';
import { DetailsModule } from '../../components/details/details.module';
import { DataTableModule } from '../../components/data-table/data-table.module';
import { DropdownMenuModule } from '../../components/dropdown-menu/dropdown-menu.module';
import { AlertDialog } from '../../components/dialogs copy/alert-dialog/alert-dialog.component';
import { DeleteDialog } from '../../components/dialogs copy/delete-dialog/delete-dialog.component';

import { PersonMenu } from './details/person-menu/person-menu.component';
import { PersonAbout } from './details/person-about/person-about.component';
import { PersonContact } from './details/person-contact/person-contact.component';
import { PersonIdentity } from './details/person-identity/person-identity.component';
import { StudentContact } from './details/student-contact/student-contact.component';
import { StudentFamily } from './details/student-family/student-family.component';
import { PersonTable } from './list/list.component';

const components = [
    PersonMenu,
    PersonAbout,
    PersonContact,
    PersonIdentity,
    StudentContact,
    StudentFamily,
    PersonTable
]

@NgModule({
    declarations: [...components],
    imports: [
        CommonModule,
        ImagesModule,
        IconsModule,
        DetailsModule,
        DataTableModule,
        DropdownMenuModule,
        AlertDialog,
        DeleteDialog
    ],
    exports: [...components, DataTableModule, AlertDialog, DeleteDialog]
})
export class HumanResourcesModule { }
