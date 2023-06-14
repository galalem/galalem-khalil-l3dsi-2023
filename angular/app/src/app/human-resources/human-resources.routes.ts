import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/security.guard';

import { ListComponent as TeacherListComponent } from './teachers/list.component';
import { FormComponent as TeacherFormComponent } from './teachers/form/form.component';
import { DetailsComponent as TeacherDetailsComponent } from './teachers/details.component';

import { ListComponent as StudentListComponent } from './students/list.component';
import { FormComponent as StudentFormComponent } from './students/form/form.component';
import { DetailsComponent as StudentDetailsComponent } from './students/details.component';

import { ListComponent as ParentListComponent } from './parents/list.component';
import { FormComponent as ParentFormComponent } from './parents/form/form.component';
import { DetailsComponent as ParentDetailsComponent } from './parents/details.component';

import { ListComponent as StaffListComponent } from './staff/list.component';
import { FormComponent as StaffFormComponent } from './staff/form/form.component';
import { DetailsComponent as StaffDetailsComponent } from './staff/details.component';

export const routes: Routes =  [
  { path: 'human-resources', title: 'Resources Humaines', canActivate: [AuthGuard], 
    data: { 
      roles: ['ADMIN'],
      menu: {
        icon: "user-group",
      },
    },
    children: [
      /* -- Start of Resources Humaines / Teachers -- */
      { 
        path: 'teachers', title: 'Enseignants', canActivate: [AuthGuard], 
        data: { 
          roles: [],
          menu: {
            icon: "user-tie",
            routerLink: ['/human-resources/teachers']
          },
          
        },
        children: [
          { 
            path: '', title: 'Les Enseignants', component: TeacherListComponent, canActivate: [AuthGuard], 
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'Resources Humaines', active: true },
                { label: 'Enseignants', active: true },
              ],
              menu: {
                disabled:true
              },
              
            },
          },
          { 
            path: 'create', title: 'Ajouter Enseignant', component: TeacherFormComponent, canActivate: [AuthGuard], 
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'Resources Humaines', active: true },
                { label: 'Enseignants', routerLink: '/human-resources/teachers' },
                { label: 'Ajouter', active: true }
              ],
              menu: {
                disabled:true
              }
            }
          },
          { 
            path: ':id', title: 'Détails Enseignant', component: TeacherDetailsComponent, canActivate: [AuthGuard], 
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'Resources Humaines', active: true },
                { label: 'Enseignants', routerLink: '/human-resources/teachers' },
                { label: 'Détails', active: true }
              ],
              menu: {
                disabled:true
              }
            }
          },
          { 
            path: ':id/edit', title: 'Modifier Enseignant', component: TeacherFormComponent, canActivate: [AuthGuard], 
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'Resources Humaines', active: true },
                { label: 'Enseignants', routerLink: '/human-resources/teachers' },
                { label: 'Modifier', active: true }
              ],
              menu: {
                disabled:true
              }
            }
          }
        ]
      },
      /* -- End of Resources Humaines / Teachers -- */
      /* -- Start of Resources Humaines / Students -- */
      { 
        path: 'students', title: 'Élèves', canActivate: [AuthGuard], 
        data: { 
          roles: [],
          menu: {
            icon: "user-graduate",
            routerLink: ['/human-resources/students']
          },
          
        },
        children: [
          { 
            path: '', title: 'Les Élèves', component: StudentListComponent, canActivate: [AuthGuard], 
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'Resources Humaines', active: true },
                { label: 'Élèves', active: true },
              ],
              menu: {
                disabled:true
              },
              
            },
          },
          { 
            path: 'create', title: 'Ajouter Élève', component: StudentFormComponent, canActivate: [AuthGuard], 
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'Resources Humaines', active: true },
                { label: 'Élèves', routerLink: '/human-resources/students' },
                { label: 'Ajouter', active: true }
              ],
              menu: {
                disabled:true
              }
            }
          },
          { 
            path: ':id', title: 'Détails Élève', component: StudentDetailsComponent, canActivate: [AuthGuard], 
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'Resources Humaines', active: true },
                { label: 'Élèves', routerLink: '/human-resources/students' },
                { label: 'Détails', active: true }
              ],
              menu: {
                disabled:true
              }
            }
          },
          { 
            path: ':id/edit', title: 'Modifier Élève', component: StudentFormComponent, canActivate: [AuthGuard], 
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'Resources Humaines', active: true },
                { label: 'Élèves', routerLink: '/human-resources/students' },
                { label: 'Modifier', active: true }
              ],
              menu: {
                disabled:true
              }
            }
          }
        ]
      },
      /* -- End of Resources Humaines / Students -- */
      /* -- Start of Resources Humaines / Parents -- */
      { 
        path: 'parents', title: 'Parents', canActivate: [AuthGuard], 
        data: { 
          roles: [],
          menu: {
            icon: "user-shield",
            routerLink: ['/human-resources/parents']
          },
          
        },
        children: [
          { 
            path: '', title: 'Les Parents', component: ParentListComponent, canActivate: [AuthGuard], 
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'Resources Humaines', active: true },
                { label: 'Parents', active: true },
              ],
              menu: {
                disabled:true
              },
              
            },
          },
          { 
            path: 'create', title: 'Ajouter Parent', component: ParentFormComponent, canActivate: [AuthGuard], 
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'Resources Humaines', active: true },
                { label: 'Parents', routerLink: '/human-resources/parents' },
                { label: 'Ajouter', active: true }
              ],
              menu: {
                disabled:true
              }
            }
          },
          { 
            path: ':id', title: 'Détails Parent', component: ParentDetailsComponent, canActivate: [AuthGuard], 
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'Resources Humaines', active: true },
                { label: 'Parents', routerLink: '/human-resources/parents' },
                { label: 'Détails', active: true }
              ],
              menu: {
                disabled:true
              }
            }
          },
          { 
            path: ':id/edit', title: 'Modifier Parent', component: ParentFormComponent, canActivate: [AuthGuard], 
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'Resources Humaines', active: true },
                { label: 'Parents', routerLink: '/human-resources/parents' },
                { label: 'Modifier', active: true }
              ],
              menu: {
                disabled:true
              }
            }
          }
        ]
      },
      /* -- End of Resources Humaines / Parents -- */
      /* -- Start of Resources Humaines / Staff -- */
      { 
        path: 'staff', title: 'Personnels', canActivate: [AuthGuard], 
        data: { 
          roles: [],
          menu: {
            icon: "user-gear",
            routerLink: ['/human-resources/staff']
          },
          
        },
        children: [
          { 
            path: '', title: 'Les Personnels', component: StaffListComponent, canActivate: [AuthGuard], 
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'Resources Humaines', active: true },
                { label: 'Personnels', active: true },
              ],
              menu: {
                disabled:true
              },
              
            },
          },
          { 
            path: 'create', title: 'Ajouter Personnel', component: StaffFormComponent, canActivate: [AuthGuard], 
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'Resources Humaines', active: true },
                { label: 'Personnels', routerLink: '/human-resources/staff' },
                { label: 'Ajouter', active: true }
              ],
              menu: {
                disabled:true
              }
            }
          },
          { 
            path: ':id', title: 'Détails Personnel', component: StaffDetailsComponent, canActivate: [AuthGuard], 
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'Resources Humaines', active: true },
                { label: 'Personnels', routerLink: '/human-resources/staff' },
                { label: 'Détails', active: true }
              ],
              menu: {
                disabled:true
              }
            }
          },
          { 
            path: ':id/edit', title: 'Modifier Personnel', component: StaffFormComponent, canActivate: [AuthGuard], 
            data: { 
              roles: [],
              breadcrumb: [
                { label: 'Accueil', routerLink: '/' },
                { label: 'Resources Humaines', active: true },
                { label: 'Personnels', routerLink: '/human-resources/staff' },
                { label: 'Modifier', active: true }
              ],
              menu: {
                disabled:true
              }
            }
          }
        ]
      },
      /* -- End of Resources Humaines / Staff -- */
    ]
  },
];

export default routes;