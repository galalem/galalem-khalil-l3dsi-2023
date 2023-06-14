import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PageModule } from '../page/page.module';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { AdminComponent } from './admin/admin.component';

import {
  AppAlert,
  AppClock,
  AppWeather,
  ChartModule,
  IconsModule
} from 'ngx-core';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageModule,
    HomePageRoutingModule,

    AppAlert,
    AppClock,
    AppWeather,
    ChartModule,
    IconsModule,

    
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  declarations: [HomePage, AdminComponent]
})
export class HomePageModule {}
