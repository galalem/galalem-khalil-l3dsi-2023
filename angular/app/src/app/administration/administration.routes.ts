import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/security.guard';

import { ListComponent as DepartmentListComponent } from './departments/list/list.component';
import { FormComponent as DepartmentFormComponent } from './departments/form/form.component';
import { DetailsComponent as DepartmentDetailsComponent } from './departments/details/details.component';

import { FormComponent as EstablishmentFormComponent } from './establishment/form/form.component';
import { DetailsComponent as EstablishmentDetailsComponent } from './establishment/details/details.component';

import { ListComponent as SchoolYearListComponent } from './school-year/list/list.component';
import { FormComponent as SchoolYearFormComponent } from './school-year/form/form.component';
import { DetailsComponent as SchoolYearDetailsComponent } from './departments/details/details.component';

export const routes: Routes =  [
  { path: 'administration', title: 'Administration', canActivate: [AuthGuard], 
    data: { 
      roles: [],
      menu: {
        icon: "landmark",
      },
    },
    children: [
      /* -- Establishment -- */
      { 
        path: 'establishment', title: 'Établissement', canActivate: [AuthGuard], 
        data: { 
          roles: [],
          menu: {
            icon: "school",
            routerLink: ['/administration/establishment']
          },
          
        },
        children: [
          { 
            path: '', title: 'Établissement', component: EstablishmentDetailsComponent, canActivate: [AuthGuard], 
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'Administration', active: true },
                { label: 'Établissement', active: true },
              ],
              menu: {
                disabled:true
              },
              
            },
          },
          { 
            path: 'edit', title: 'Modifier Établissement', component: EstablishmentFormComponent, canActivate: [AuthGuard], 
            data: { 
              roles: ['ADMIN'],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'Administration', active: true },
                { label: 'Établissement', routerLink: '/administration/establishment' },
                { label: 'Modifier', active: true }
              ],
              menu: {
                disabled:true
              }
            }
          }
        ]
      },
      /* -- End of Establishment -- */
      /* -- Start of Departments -- */
      { 
        path: 'departments', title: 'Départements', canActivate: [AuthGuard], 
        data: { 
          roles: [],
          menu: {
            icon: "hotel",
            routerLink: ['/administration/departments']
          },
          
        },
        children: [
          { 
            path: '', title: 'Les Départements', component: DepartmentListComponent, canActivate: [AuthGuard], 
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'Administration', active: true },
                { label: 'Départements', active: true },
              ],
              menu: {
                disabled:true
              },
              
            },
          },
          { 
            path: 'create', title: 'Ajouter Département', component: DepartmentFormComponent, canActivate: [AuthGuard], 
            data: { 
              roles: ['ADMIN'],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'Administration', active: true },
                { label: 'Départements', routerLink: '/administration/departments' },
                { label: 'Ajouter', active: true }
              ],
              menu: {
                disabled:true
              }
            }
          },
          { 
            path: ':id', title: 'Détails Département', component: DepartmentDetailsComponent, canActivate: [AuthGuard], 
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'Administration', active: true },
                { label: 'Départements', routerLink: '/administration/departments' },
                { label: 'Détails', active: true }
              ],
              menu: {
                disabled:true
              }
            }
          },
          { 
            path: ':id/edit', title: 'Modifier Département', component: DepartmentFormComponent, canActivate: [AuthGuard], 
            data: { 
              roles: ['ADMIN'],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'Administration', active: true },
                { label: 'Départements', routerLink: '/administration/departments' },
                { label: 'Modifier', active: true }
              ],
              menu: {
                disabled:true
              }
            }
          }
        ]
      },
      /* -- End of Departments -- */
      /* -- Start of School Year -- */
      { 
        path: 'school-year', title: 'Années Scolaires', canActivate: [AuthGuard], 
        data: { 
          roles: ['ADMIN'],
          menu: {
            icon: "calendar-week",
            routerLink: ['/administration/school-year']
          },
          
        },
        children: [
          { 
            path: '', title: 'Les Années Scolaires', component: SchoolYearListComponent, canActivate: [AuthGuard], 
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'Administration', active: true },
                { label: 'Années Scolaires', active: true },
              ],
              menu: {
                disabled:true
              },
              
            },
          },
          { 
            path: 'create', title: 'Ajouter Année Scolaire', component: SchoolYearFormComponent, canActivate: [AuthGuard], 
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'Administration', active: true },
                { label: 'Années Scolaires', routerLink: '/administration/school-year' },
                { label: 'Ajouter', active: true }
              ],
              menu: {
                disabled:true
              }
            }
          },
          { 
            path: ':id', title: 'Détails Année Scolaire', component: SchoolYearDetailsComponent, canActivate: [AuthGuard], 
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'Administration', active: true },
                { label: 'Années Scolaires', routerLink: '/administration/school-year' },
                { label: 'Détails', active: true }
              ],
              menu: {
                disabled:true
              }
            }
          },
          { 
            path: ':id/edit', title: 'Modifier Année Scolaire', component: SchoolYearFormComponent, canActivate: [AuthGuard], 
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'Administration', active: true },
                { label: 'Années Scolaires', routerLink: '/administration/school-year' },
                { label: 'Modifier', active: true }
              ],
              menu: {
                disabled:true
              }
            }
          }
        ]
      },
      /* -- End of School Year -- */
    ]
  },
];

export default routes;