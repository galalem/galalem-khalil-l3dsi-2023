import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/security.guard';
import { TestComponent } from './test/test.component';
//import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent as DashboardComponent } from './dashboard/admin/admin.component';

import { IndexComponent as AnnouncementsIndexComponent } from './news/announcements/index/index.component';

import { ProfileComponent } from './auth/profile/profile.component';
import HumanResourcesRoutes from './human-resources/human-resources.routes';
import AdministrationRoutes from './administration/administration.routes';
import SchoolingRoutes from './schooling/schooling.routes';
import ScheduleRoutes from './schedule/schedule.routes';
import GradingRoutes from './grading/grading.routes';

const routes: Routes =  [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full', data: {menu: {disabled: true}}},
  { path: 'sandbox', title: 'Sandbox', component: TestComponent, data: 
    { 
      roles: [],
      breadcrumb: [],
      menu: {disabled: true},
    } 
  },
  { path: 'dashboard', title: 'Tableau de bord', component: DashboardComponent, canActivate: [AuthGuard], data: 
    { 
      roles: [],
      breadcrumb: [
        { label: 'Accueil', active: true },
        { label: 'Tableau de bord', active: true },
      ],
      menu: {
        label: 'Tableau de bord',
        icon: "gauge-high",
        routerLink: ['/dashboard']
      },
    } 
  },
  { path: 'news', title: 'Actualités', component: AnnouncementsIndexComponent, canActivate: [AuthGuard], data: 
    { 
      roles: [],
      breadcrumb: [
        { label: 'Accueil', active: true },
        { label: 'Actualités', active: true },
      ],
      menu: {
        label: 'Actualités',
        icon: "newspaper",
        routerLink: ['/news']
      },
    } 
  },
  { path: 'profile', title: 'Profile', component: ProfileComponent, canActivate: [AuthGuard], data: 
    { 
      roles: [],
      breadcrumb: [
        { label: 'Accueil', active: true },
        { label: 'Profile', active: true },
      ],
      menu: {
        disabled: true
      },
    } 
  },
  ...HumanResourcesRoutes,
  ...SchoolingRoutes,
  ...ScheduleRoutes,
  ...GradingRoutes,
  ...AdministrationRoutes,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

