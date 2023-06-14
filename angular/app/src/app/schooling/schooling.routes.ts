import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/security.guard';

import { DetailsComponent as ClassDetailsComponent } from './classes/details/details.component';

import { ListComponent as SubjectListComponent } from './subjects/list/list.component';
import { FormComponent as SubjectFormComponent } from './subjects/form/form.component';
import { DetailsComponent as SubjectDetailsComponent } from './subjects/details/details.component';
import { CriteriaComponent } from './subjects/criteria/criteria.component';

import { IndexComponent } from './index/index.component';


export const routes: Routes = [
  { path: 'schooling', title: 'Scolarité', canActivate: [AuthGuard], 
    data: { 
      roles: ['ADMIN', 'TEACHER'],
      menu: {
        icon: "graduation-cap",
        routerLink: ['/schooling']
      },
    },
    children: [
      { 
        path: '', title: 'Les Classes', component: IndexComponent, canActivate: [AuthGuard], 
        data: { 
          roles: [],
          breadcrumb: [
            { label: 'Accueil', routerLink: '/' },
            { label: 'Scolarité', active: true },
          ],
          menu: {
            disabled:true
          },
          
        },
      },
      { 
        path: 'classes/:id/students', title: 'Détails Classe', component: ClassDetailsComponent, canActivate: [AuthGuard], 
        data: { 
          roles: [],
          breadcrumb: [
            { label: 'Accueil', routerLink: '/' },
            { label: 'Scolarité', routerLink: '/schooling' }, 
            { label: 'Classe', active: true },
            { label: 'Élèves', active: true }
          ],
          menu: {
            disabled:true
          },
        },
      },
      { 
        path: 'classes/:id/subjects', title: 'Les Matières', component: SubjectListComponent, canActivate: [AuthGuard], 
        data: { 
          roles: [],
          breadcrumb: [
            { label: 'Accueil', routerLink: '/' },
            { label: 'Scolarité', routerLink: '/schooling' },
            { label: 'Classe', active: true },
            { label: 'Matières', active: true },
          ],
          menu: {
            disabled:true
          },
        },
      },
      { 
        path: 'classes/:id/subjects/create', title: 'Nouvelle Matière', component: SubjectFormComponent, canActivate: [AuthGuard], 
        data: { 
          roles: [],
          breadcrumb: [
            { label: 'Accueil', routerLink: '/' },
            { label: 'Scolarité', routerLink: '/schooling' },
            { label: 'Classe', active: true },
            { label: 'Matières', active: true },
            { label: 'Ajouter', active: true },
          ],
          menu: {
            disabled:true
          },
        },
      },
      { 
        path: 'classes/:id/subjects/:subject', title: 'Détails Matière', component: SubjectDetailsComponent, canActivate: [AuthGuard], 
        data: { 
          roles: [],
          breadcrumb: [
            { label: 'Accueil', routerLink: '/' },
            { label: 'Scolarité', routerLink: '/schooling' },
            { label: 'Classe', active: true },
            { label: 'Matières', active: true },
            { label: 'Détails', active: true },
          ],
          menu: {
            disabled:true
          },
        },
      },
      { 
        path: 'classes/:id/subjects/:subject/edit', title: 'Modifier Matière', component: SubjectFormComponent, canActivate: [AuthGuard], 
        data: { 
          roles: [],
          breadcrumb: [
            { label: 'Accueil', routerLink: '/' },
            { label: 'Scolarité', routerLink: '/schooling' },
            { label: 'Classe', active: true },
            { label: 'Matières', active: true },
            { label: 'Modifier', active: true },
          ],
          menu: {
            disabled:true
          },
        },
      },
      { 
        path: 'classes/:id/subjects/:subject/criteria', title: 'Système d\'Évaluation', component: CriteriaComponent, canActivate: [AuthGuard], 
        data: { 
          roles: [],
          breadcrumb: [
            { label: 'Accueil', routerLink: '/' },
            { label: 'Scolarité', routerLink: '/schooling' },
            { label: 'Classe', active: true },
            { label: 'Matières', active: true },
            { label: 'Système d\'Évaluation', active: true },
          ],
          menu: {
            disabled:true
          },
        },
      },
    ]
  },
];

export default routes;
