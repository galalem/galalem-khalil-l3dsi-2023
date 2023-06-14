import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsComponent as ClassDetailsComponent } from './classes/details/details.component';

import { ListComponent as SubjectListComponent } from './subjects/list/list.component';
import { DetailsComponent as SubjectDetailsComponent } from './subjects/details/details.component';

import { IndexComponent } from './index/index.component';


export const routes: Routes = [
  { 
    path: '', title: 'Les Classes', component: IndexComponent
  },
  { 
    path: 'classes/:id/students', title: 'Détails Classe', component: ClassDetailsComponent,
  },
  { 
    path: 'classes/:id/subjects', title: 'Les Matières', component: SubjectListComponent,
  },
  { 
    path: 'classes/:id/subjects/:subject', title: 'Détails Matière', component: SubjectDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolingRoutingModule {}
