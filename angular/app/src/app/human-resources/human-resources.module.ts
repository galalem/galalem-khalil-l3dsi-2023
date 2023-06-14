import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ListComponent as TeacherListComponent } from './teachers/list.component';
import { FormComponent as TeacherFormComponent } from './teachers/form/form.component';
import { DetailsComponent as TeacherDetailsComponent } from './teachers/details.component';

import { DetailsComponent as StudentListComponent } from './students/details.component';
import { FormComponent as StudentFormComponent } from './students/form/form.component';
import { ListComponent as StudentDetailsComponent } from './students/list.component';

import { DetailsComponent as ParentListComponent } from './parents/details.component';
import { FormComponent as ParentFormComponent } from './parents/form/form.component';
import { ListComponent as ParentDetailsComponent } from './parents/list.component';

import { DetailsComponent as StaffListComponent } from './staff/details.component';
import { FormComponent as StaffFormComponent } from './staff/form/form.component';
import { ListComponent as StaffDetailsComponent } from './staff/list.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { 
  AlertModule, 
  DataTableModule,
  DetailsModule, 
  DialogModule, 
  DragAndDropModule, 
  DropdownMenuModule, 
  FormModule, 
  IconsModule,
  ImagesModule,
  HumanResourcesModule as HRModule,
} from 'ngx-core';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    TeacherListComponent,
    TeacherFormComponent,
    TeacherDetailsComponent,
    StudentDetailsComponent,
    StudentFormComponent,
    StudentListComponent,
    ParentDetailsComponent,
    ParentFormComponent,
    ParentListComponent,
    StaffDetailsComponent,
    StaffFormComponent,
    StaffListComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatTabsModule,
    AlertModule,
    DataTableModule,
    DetailsModule, 
    DialogModule, 
    DragAndDropModule, 
    DropdownMenuModule, 
    FormModule, 
    IconsModule,
    ImagesModule,
    HRModule
  ], 
  exports: [
    TeacherListComponent,
    TeacherFormComponent,
    TeacherDetailsComponent,
    StudentDetailsComponent,
    StudentFormComponent,
    StudentListComponent,
    ParentDetailsComponent,
    ParentFormComponent,
    ParentListComponent,
    StaffDetailsComponent,
    StaffFormComponent,
    StaffListComponent,
  ]
})
export class HumanResourcesModule { }
