import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertDialog, AlertModule, DataTableModule, DeleteDialog, DetailsModule, DropdownMenuModule, EmptyModule, FormModule, IconsModule, ImagesModule, InfoDialog, TreeViewModule } from 'ngx-core';
import { IonicModule } from '@ionic/angular';
import { DetailsComponent as ClassDetailsComponent } from './classes/details/details.component';
import { UnassignDialogComponent } from './classes/details/unassign-dialog.component';
import { ListComponent as SubjectListComponent } from './subjects/list/list.component';
import { FormComponent as SubjectFormComponent } from './subjects/form/form.component';
import { DetailsComponent as SubjectDetailsComponent } from './subjects/details/details.component';
import { IndexComponent } from './index/index.component';
import { CriteriaComponent } from './subjects/criteria/criteria.component';


const components = [
  IndexComponent,
  ClassDetailsComponent,
  UnassignDialogComponent,
  SubjectListComponent,
  SubjectFormComponent,
  SubjectDetailsComponent,
]

@NgModule({
  declarations: [
    ...components,
    CriteriaComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    MatExpansionModule,
    MatDialogModule,
    AlertModule,
    DataTableModule,
    DetailsModule, 
    DropdownMenuModule, 
    EmptyModule,
    FormModule, 
    IconsModule,
    ImagesModule,
    TreeViewModule,
    IonicModule, 
    DeleteDialog,
    AlertDialog,
    InfoDialog
  ],
  exports: [
    ...components
  ],
})
export class SchoolingModule { }
