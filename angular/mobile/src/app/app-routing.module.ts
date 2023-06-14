import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, PreloadAllModules, RouterModule,RouterStateSnapshot, Routes } from '@angular/router';
import { AppPage, LoadingPage } from './page/page.component';
import { AuthService } from './keycloak/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class ActivateGuard implements CanActivate {

  constructor(private auth: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(route.url);
    
    return this.auth.session();
  }

}


const routes: Routes = [
  {
    path: 'loading',
    component: LoadingPage,
    title: 'Chargement...',
  },
  {
    path: '',
    component: AppPage,
    canActivate: [ActivateGuard],
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'news',
        loadChildren: () => import('./news/index/index.module').then(m => m.IndexPageModule)
      },
      {
        path: 'human-resources/teachers',
        loadChildren: () => import('./human-resources/teachers/teachers.module').then(m => m.TeachersModule)
      },
      {
        path: 'human-resources/students',
        loadChildren: () => import('./human-resources/students/students.module').then(m => m.StudentsModule)
      },
      {
        path: 'human-resources/parents',
        loadChildren: () => import('./human-resources/parents/parents.module').then(m => m.ParentsModule)
      },
      {
        path: 'human-resources/staff',
        loadChildren: () => import('./human-resources/staff/staff.module').then(m => m.StaffModule)
      },
      {
        path: 'schooling',
        loadChildren: () => import('./schooling/schooling.module').then(m => m.SchoolingModule)
      },
      {
        path: 'schedule',
        loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule)
      },
      {
        path: 'administration',
        loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule)
      },
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload',  })
  ],
  providers: [ActivateGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
