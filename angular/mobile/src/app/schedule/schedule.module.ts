import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageModule } from '../page/page.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertModule, DataTableModule, DeleteDialog, DialogModule, DropdownMenuModule, EmptyModule, IconsModule, InfoDialog, ScheduleComponent } from 'ngx-core';
import { IonicModule } from '@ionic/angular';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleRoutingModule } from './schedule.routing.module';
import { ClassListComponent } from './list/classes.component';
import { ClassDetailsComponent } from './details/classes.component';
import { StudentListComponent } from './list/students.component';
import { StudentDetailsComponent } from './details/students.component';
import { TeacherListComponent } from './list/teachers.component';
import { TeacherDetailsComponent } from './details/teachers.component';
import { PlaceListComponent } from './list/places.component';
import { PlaceDetailsComponent } from './details/places.component';
import { UserDetailsComponent } from './details/user.component';


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
];


@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    IonicModule, 
    ScheduleRoutingModule,
    PageModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    AlertModule,
    DataTableModule,
    IconsModule,
    ScheduleComponent,
  ],
  exports: [
    //...components
  ],
})
export class ScheduleModule { }
