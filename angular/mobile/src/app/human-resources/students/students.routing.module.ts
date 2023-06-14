import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsPage } from './details.page';
import { ListPage } from './list.page';

const routes: Routes = [
  {
    path: '',
    title: 'Élèves',
    component: ListPage
  },
  {
    path: ':id',
    title: 'Détails',
    component: DetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
