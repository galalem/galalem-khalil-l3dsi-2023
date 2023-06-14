import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { IconsModule } from 'ngx-core';
import { PreloaderModule } from '../preloader/preloader.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    PreloaderModule,
    IconsModule,
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
