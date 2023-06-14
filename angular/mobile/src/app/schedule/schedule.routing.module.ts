import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ClassListComponent } from './list/classes.component';
import { ClassDetailsComponent } from './details/classes.component';

import { StudentListComponent } from './list/students.component';
import { StudentDetailsComponent } from './details/students.component';

import { TeacherListComponent } from './list/teachers.component';
import { TeacherDetailsComponent } from './details/teachers.component';

import { PlaceListComponent } from './list/places.component';
import { PlaceDetailsComponent } from './details/places.component';

import { UserDetailsComponent } from './details/user.component';


const routes:Routes = [
  {
    title:'Emploi de Temps', path: 'classes', component: ClassListComponent,
  },
  {
    title:'Emploi de Temps', path: 'classes/:id', component: ClassDetailsComponent,
  },
  {
    title:'Emploi de Temps', path: 'students', component: StudentListComponent,
  },
  {
    title:'Emploi de Temps', path: 'students/:id', component: StudentDetailsComponent,
  },
  {
    title:'Emploi de Temps', path: 'teachers', component: TeacherListComponent,
  },
  {
    title:'Emploi de Temps', path: 'teachers/:id', component: TeacherDetailsComponent,
  },
  {
    title:'Emploi de Temps', path: 'places', component: PlaceListComponent,
  },
  {
    title:'Emploi de Temps', path: 'places/:id', component: PlaceDetailsComponent,
  },
  { 
    title:'Emploi de Temps', path: 'user', component: UserDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleRoutingModule {}

