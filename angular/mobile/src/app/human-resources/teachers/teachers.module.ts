import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { AppAlert, HumanResourcesModule } from 'ngx-core';
import { PageModule } from '../../page/page.module';

import { TeachersRoutingModule } from './teachers.routing.module';

import { ListPage } from './list.page';
import { DetailsPage } from './details.page';


import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HumanResourcesModule,
    TeachersRoutingModule,
    PageModule,
    AppAlert,
    MatDialogModule
  ],
  declarations: [ListPage, DetailsPage]
})
export class TeachersModule {}
