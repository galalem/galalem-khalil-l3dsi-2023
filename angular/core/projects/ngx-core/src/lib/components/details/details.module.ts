import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleTextComponent } from './simple-text/simple-text.component';
import { IconsModule } from '../icons/icons.module';



@NgModule({
  declarations: [
    SimpleTextComponent
  ],
  imports: [
    CommonModule,
    IconsModule
  ],
  exports: [
    SimpleTextComponent
  ]
})
export class DetailsModule { }
