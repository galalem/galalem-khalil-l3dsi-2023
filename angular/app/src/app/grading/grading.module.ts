import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent as SessionListComponent } from './sessions/list/list.component';
import { FormComponent as SessionFormComponent } from './sessions/form/form.component';

import { TeacherStatsComponent } from './stats/teachers.component';
import { StudentStatsComponent } from './stats/students.component';

import { IndexComponent } from './grades/index/index.component';
import { FormComponent } from './grades/form/form.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { 
  AppDialog,
  AlertModule, 
  DataTableModule,
  DetailsModule, 
  DialogModule, 
  DropdownMenuModule, 
  EmptyModule,
  FormModule, 
  IconsModule,
  ImagesModule,
} from 'ngx-core';
import { AppRoutingModule } from '../app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IonicModule } from '@ionic/angular';
import { ReportComponent } from './grades/report/report.component';

const components = [
  SessionListComponent,
  SessionFormComponent,
  TeacherStatsComponent,
  StudentStatsComponent,
  IndexComponent,
  FormComponent,
];

@NgModule({
  declarations: [
    ...components,
    ReportComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    MatExpansionModule,
    MatDialogModule,
    MatTooltipModule,
    IonicModule,
    AppDialog,
    AlertModule,
    DataTableModule,
    DetailsModule, 
    DialogModule, 
    DropdownMenuModule, 
    EmptyModule,
    FormModule, 
    IconsModule,
    ImagesModule,
  ], 
  exports: [
    ...components
  ]
})
export class GradingModule { }
