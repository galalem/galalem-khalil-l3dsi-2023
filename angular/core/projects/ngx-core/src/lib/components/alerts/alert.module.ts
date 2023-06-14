import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAlert } from './alert.component';
import { AlertDangerComponent } from './alert-danger.component';
import { AlertInfoComponent } from './alert-info.component';
import { AlertSuccessComponent } from './alert-success.component';
import { AlertWarningComponent } from './alert-warning.component';
import { IconsModule } from '../icons/icons.module';



@NgModule({
  declarations: [
    AlertDangerComponent,
    AlertInfoComponent,
    AlertSuccessComponent,
    AlertWarningComponent,
  ],
  imports: [
    CommonModule,
    IconsModule,
    AppAlert
  ],
  exports: [
    AppAlert,
    AlertDangerComponent,
    AlertInfoComponent,
    AlertSuccessComponent,
    AlertWarningComponent,
  ]
})
export class AlertModule { }
