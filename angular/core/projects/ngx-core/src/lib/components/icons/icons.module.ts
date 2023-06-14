import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FontAwesomeComponent } from './font-awesome/font-awesome.component';



@NgModule({
  declarations: [
    FontAwesomeComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    FontAwesomeComponent
  ]
})
export class IconsModule { }
