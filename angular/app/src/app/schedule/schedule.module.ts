import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertModule, DataTableModule, DeleteDialog, DialogModule, DropdownMenuModule, EmptyModule, IconsModule, InfoDialog } from 'ngx-core';
import { IonicModule } from '@ionic/angular';
import { ClassListComponent } from './list/classes.component';
import { ClassDetailsComponent } from './details/classes.component';
import { StudentListComponent } from './list/students.component';
import { StudentDetailsComponent } from './details/students.component';
import { TeacherListComponent } from './list/teachers.component';
import { TeacherDetailsComponent } from './details/teachers.component';
import { PlaceListComponent } from './list/places.component';
import { PlaceDetailsComponent } from './details/places.component';
import { UserDetailsComponent } from './details/user.component';
import { DetailsComponent } from './details/details.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleComponent } from '../template/components/schedule/schedule.component';


const components = [
  ClassListComponent,
  ClassDetailsComponent,
  StudentListComponent,
  StudentDetailsComponent,
  TeacherListComponent,
  TeacherDetailsComponent,
  PlaceListComponent,
  PlaceDetailsComponent,
  UserDetailsComponent
]


@NgModule({
  declarations: [
    ...components,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatExpansionModule,
    AlertModule,
    DataTableModule,
    DialogModule, 
    DropdownMenuModule, 
    EmptyModule,
    IconsModule,
    IonicModule, 
    DeleteDialog,
    InfoDialog,
    ScheduleComponent
  ],
  exports: [
    ...components
  ],
})
export class ScheduleModule { }
