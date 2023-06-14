import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AlertModule, AppAlert, DataTableModule, DetailsModule, HumanResourcesModule, IconsModule, ImagesModule } from 'ngx-core';
import { PageModule } from '../../page/page.module';

import { ParentsRoutingModule } from './parents.routing.module';

import { ListPage } from './list.page';
import { DetailsPage } from './details.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HumanResourcesModule,
    ParentsRoutingModule,
    PageModule,
    AppAlert,
  ],
  declarations: [ListPage, DetailsPage]
})
export class ParentsModule {}
