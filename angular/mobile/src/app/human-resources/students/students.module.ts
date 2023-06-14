import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AlertModule, AppAlert, DataTableModule, DetailsModule, HumanResourcesModule, IconsModule, ImagesModule } from 'ngx-core';
import { PageModule } from '../../page/page.module';

import { StudentsRoutingModule } from './students.routing.module';

import { ListPage } from './list.page';
import { DetailsPage } from './details.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HumanResourcesModule,
    StudentsRoutingModule,
    AlertModule,
    PageModule,
    AppAlert,
  ],
  declarations: [ListPage, DetailsPage]
})
export class StudentsModule {}

