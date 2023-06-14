import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/security.guard';

import { ClassListComponent } from './list/classes.component';
import { ClassDetailsComponent } from './details/classes.component';

import { StudentListComponent } from './list/students.component';
import { StudentDetailsComponent } from './details/students.component';

import { TeacherListComponent } from './list/teachers.component';
import { TeacherDetailsComponent } from './details/teachers.component';

import { PlaceListComponent } from './list/places.component';
import { PlaceDetailsComponent } from './details/places.component';

import { UserDetailsComponent } from './details/user.component';


export const routes: Routes = [
  { path: 'schedule', title: 'Emploi de temps', canActivate: [AuthGuard], 
    data: { 
      roles: ["ADMIN"],
      menu: {
        icon: "calendar-days",
        iconType: "regular",
      },
    },
    children: [
      { 
        path: 'classes', title: 'par Classe', 
        data: { 
          roles: [],
          menu: {
            icon: "user-group",
            routerLink: ['/schedule/classes']
          },
        },
        children: [
          { 
            path: '', title: 'Les Classes', component: ClassListComponent,
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'EDT', active: true },
                { label: 'Classes', active: true },
              ],
              menu: {
                disabled:true
              },
            },
          },
          { 
            path: ':id', title: 'Emploi de Temps', component: ClassDetailsComponent,
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'EDT', active: true },
                { label: 'Classes', routerLink: '/schedule/classes' },
                { label: 'Aperçu', active: true },
              ],
              menu: {
                disabled:true
              },
            },
          },
        ]
      },
      { 
        path: 'students', title: 'par Élève', 
        data: { 
          roles: [],
          menu: {
            icon: "user-graduate",
            routerLink: ['/schedule/students']
          },
        },
        children: [
          { 
            path: '', title: 'Les Élèves', component: StudentListComponent,
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'EDT', active: true },
                { label: 'Élèves', active: true },
              ],
              menu: {
                disabled:true
              },
            },
          },
          { 
            path: ':id', title: 'Emploi de Temps', component: StudentDetailsComponent,
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'EDT', active: true },
                { label: 'Élèves', routerLink: '/schedule/students' },
                { label: 'Aperçu', active: true },
              ],
              menu: {
                disabled:true
              },
            },
          },
        ]
      },
      { 
        path: 'teachers', title: 'par Enseignant', 
        data: { 
          roles: [],
          menu: {
            icon: "user-tie",
            routerLink: ['/schedule/teachers']
          },
        },
        children: [
          { 
            path: '', title: 'Les Enseignants', component: TeacherListComponent,
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'EDT', active: true },
                { label: 'Enseignants', active: true },
              ],
              menu: {
                disabled:true
              },
            },
          },
          { 
            path: ':id', title: 'Emploi de Temps', component: TeacherDetailsComponent,
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'EDT', active: true },
                { label: 'Enseignants', routerLink: '/schedule/teachers' },
                { label: 'Aperçu', active: true },
              ],
              menu: {
                disabled:true
              },
            },
          },
        ]
      },
      { 
        path: 'places', title: 'par Salle', 
        data: { 
          roles: [],
          menu: {
            icon: "people-roof",
            routerLink: ['/schedule/places']
          },
        },
        children: [
          { 
            path: '', title: 'Les Salles', component: PlaceListComponent,
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'EDT', active: true },
                { label: 'Salles', active: true },
              ],
              menu: {
                disabled:true
              },
            },
          },
          { 
            path: ':id', title: 'Emploi de Temps', component: PlaceDetailsComponent,
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'EDT', active: true },
                { label: 'Salles', routerLink: '/schedule/places' },
                { label: 'Aperçu', active: true },
              ],
              menu: {
                disabled:true
              },
            },
          },
        ]
      },
    ]
  },
  { path: 'schedule/user', title: 'Emploi de temps', canActivate: [AuthGuard], component: UserDetailsComponent, 
    data: { 
      roles: ["TEACHER", "STUDENT"],
      breadcrumb: [
        { label: 'Accueil', routerLink: '/' },
        { label: 'EDT', active: true },
      ],
      menu: {
        icon: "calendar-days",
        iconType: "regular",
        routerLink: ['/schedule/user']
      },
    },
  },
];

export default routes;
