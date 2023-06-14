import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent as DepartmentListComponent } from './departments/list/list.component';
import { DetailsComponent as DepartmentDetailsComponent } from './departments/details/details.component';

import { DetailsComponent as EstablishmentDetailsComponent } from './establishment/details.component';

const routes: Routes =  [
  { 
    path: 'establishment', title: 'Établissement', component: EstablishmentDetailsComponent
  },
  { 
    path: 'departments', title: 'Les Départements', component: DepartmentListComponent,
  },
  { 
    path: 'departments/:id', title: 'Détails Département', component: DepartmentDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}