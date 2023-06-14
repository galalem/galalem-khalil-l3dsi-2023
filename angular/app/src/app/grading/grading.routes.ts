import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/security.guard';

import { ListComponent as SessionDetailsComponent } from './sessions/list/list.component';
import { FormComponent as SessionFormComponent } from './sessions/form/form.component';

import { TeacherStatsComponent } from './stats/teachers.component';
import { StudentStatsComponent } from './stats/students.component';

import { IndexComponent } from './grades/index/index.component';
import { FormComponent } from './grades/form/form.component';

import { ReportComponent } from './grades/report/report.component';

export const routes: Routes =  [
  { path: 'grading/sessions', title: 'Évaluation', canActivate: [AuthGuard], 
    data: { 
      roles: ['ADMIN'],
      menu: {
        routerLink: '/grading/sessions',
        icon: "clipboard-list",
      },
    },
    children: [
      { 
        path: '', title: 'Sessions d\'Évaluation', component: SessionDetailsComponent, 
        data: { 
          roles: [],
          breadcrumb: [
            { label: 'Accueil', routerLink: '/' },
            { label: 'Évaluation', active: true },
            { label: 'Sessions', active: true },
          ],
          menu: {
            disabled:true
          },
          
        },
      },
      { 
        path: 'create', title: 'Nouvelle Session', component: SessionFormComponent,
        data: { 
          roles: [],
          breadcrumb: [
            { label: 'Accueil', routerLink: '/' },
            { label: 'Évaluation', active: true },
            { label: 'Sessions', routerLink: '/grading/sessions' },
            { label: 'Nouvelle Session', active: true }
          ],
          menu: {
            disabled:true
          }
        }
      },
      { 
        path: ':id/edit', title: 'Modifier Session', component: SessionFormComponent, 
        data: { 
          roles: [],
          breadcrumb: [
            { label: 'Accueil', routerLink: '/' },
            { label: 'Évaluation', active: true },
            { label: 'Sessions', routerLink: '/grading/sessions' },
            { label: 'Modifier Session', active: true }
          ],
          menu: {
            disabled:true
          }
        }
      },
      { 
        path: ':id/progress/teachers', title: 'Avancement d\'Évaluation', component: TeacherStatsComponent,
        data: { 
          roles: [],
          breadcrumb: [
            { label: 'Accueil', routerLink: '/' },
            { label: 'Évaluation', active: true },
            { label: 'Sessions', routerLink: '/grading/sessions' },
            { label: 'Avancement', active: true },
            { label: 'Enseignants', active: true }
          ],
          menu: {
            disabled:true
          }
        }
      },
      { 
        path: ':id/progress/students', title: 'Avancement d\'Évaluation', component: StudentStatsComponent,
        data: { 
          roles: [],
          breadcrumb: [
            { label: 'Accueil', routerLink: '/' },
            { label: 'Évaluation', active: true },
            { label: 'Sessions', routerLink: '/grading/sessions' },
            { label: 'Avancement', active: true },
            { label: 'Élèves', active: true }
          ],
          menu: {
            disabled:true
          }
        }
      }
    ]
  },
  { path: 'grading/reports', title: 'Évaluation', canActivate: [AuthGuard], 
    data: { 
      roles: ['STUDENT'],
      menu: {
        routerLink: '/grading/reports',
        icon: "clipboard-list",
      },
    },
    children: [
      { 
        path: '', title: 'Session d\'Évaluation', component: ReportComponent, 
        data: { 
          roles: [],
          breadcrumb: [
            { label: 'Accueil', routerLink: '/' },
            { label: 'Évaluation', active: true },
            { label: 'Sessions', active: true },
          ],
          menu: {
            disabled:true
          },
        },
      },
      { 
        path: ':id', title: 'Relevé des notes', component: FormComponent, 
        data: { 
          roles: [],
          breadcrumb: [
            { label: 'Accueil', routerLink: '/' },
            { label: 'Évaluation', active: true },
            { label: 'Sessions', routerLink: '/grading/reports' },
            { label: 'Relevé', active: true },
          ],
          menu: {
            disabled:true
          },
        },
      },
    ]
  },
  { path: 'grading', title: 'Évaluation', canActivate: [AuthGuard], 
    data: { 
      roles: ['TEACHER'],
      menu: {
        routerLink: '/grading',
        icon: "clipboard-list",
      },
    },
    children: [
      { 
        path: '', title: 'Session d\'Évaluation', component: IndexComponent, 
        data: { 
          roles: [],
          breadcrumb: [
            { label: 'Accueil', routerLink: '/' },
            { label: 'Évaluation', active: true },
            { label: 'Session', active: true },
          ],
          menu: {
            disabled:true
          },
        },
      },
      { 
        path: 'grades/:id', title: 'Remise des notes', component: FormComponent, 
        data: { 
          roles: [],
          breadcrumb: [
            { label: 'Accueil', routerLink: '/' },
            { label: 'Évaluation', active: true },
            { label: 'Session', routerLink: '/grading' },
            { label: 'Matière', active: true },
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