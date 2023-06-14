import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ListComponent as DepartmentListComponent } from './departments/list/list.component';
import { FormComponent as DepartmentFormComponent } from './departments/form/form.component';
import { DetailsComponent as DepartmentDetailsComponent } from './departments/details/details.component';
import { LevelDialogComponent } from './departments/details/level-dialog.component';

import { FormComponent as EstablishmentFormComponent } from './establishment/form/form.component';
import { DetailsComponent as EstablishmentDetailsComponent } from './establishment/details/details.component';

import { FormComponent as SchoolYearFormComponent } from './school-year/form/form.component';
import { ListComponent as SchoolYearListComponent } from './school-year/list/list.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { 
  AppDialog,
  AlertModule, 
  DataTableModule,
  DetailsModule, 
  DialogModule, 
  DragAndDropModule, 
  DropdownMenuModule, 
  EmptyModule,
  FormModule, 
  IconsModule,
  ImagesModule,
  TreeViewModule,
} from 'ngx-core';
import { AppRoutingModule } from '../app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IonicModule } from '@ionic/angular';
import { PreviewDialogComponent } from './school-year/form/preview-dialog.component';

@NgModule({
  declarations: [
    DepartmentListComponent,
    DepartmentFormComponent,
    DepartmentDetailsComponent,
    LevelDialogComponent,
    EstablishmentFormComponent,
    EstablishmentDetailsComponent,
    SchoolYearFormComponent,
    SchoolYearListComponent,
    PreviewDialogComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTooltipModule,
    IonicModule,
    AppDialog,
    AlertModule,
    DataTableModule,
    DetailsModule, 
    DialogModule, 
    DragAndDropModule, 
    DropdownMenuModule, 
    EmptyModule,
    FormModule, 
    IconsModule,
    ImagesModule,
    TreeViewModule
  ], 
  exports: [
    DepartmentListComponent,
    DepartmentFormComponent,
    DepartmentDetailsComponent,
    EstablishmentFormComponent,
    EstablishmentDetailsComponent,
    SchoolYearFormComponent
  ]
})
export class AdministrationModule { }
