import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndexPageRoutingModule } from './index-routing.module';

import { IndexPage } from './index.page';
import { PageModule } from '../../page/page.module';
import { AnnouncementsModule, DragAndDropModule, IconsModule } from 'ngx-core';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IconsModule,
    IndexPageRoutingModule,
    PageModule,
    AnnouncementsModule,
    DragAndDropModule,
    MatExpansionModule,
    MatDialogModule
  ],
  declarations: [IndexPage]
})
export class IndexPageModule {}
