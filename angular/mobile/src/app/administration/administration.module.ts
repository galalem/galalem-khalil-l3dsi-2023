import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AdministrationRoutingModule } from './administration.routes.module';


import { ListComponent as DepartmentListComponent } from './departments/list/list.component';
import { DetailsComponent as DepartmentDetailsComponent } from './departments/details/details.component';

import { DetailsComponent as EstablishmentDetailsComponent } from './establishment/details.component';

import { 
  AlertModule, 
  DataTableModule,
  DetailsModule, 
  EmptyModule,
  ImagesModule,
  TreeViewModule,
} from 'ngx-core';

@NgModule({
  declarations: [
    DepartmentListComponent,
    DepartmentDetailsComponent,
    EstablishmentDetailsComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    AdministrationRoutingModule,
    AlertModule,
    DataTableModule,
    DetailsModule, 
    EmptyModule,
    ImagesModule,
    TreeViewModule
  ],
})
export class AdministrationModule { }
