import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownMenuComponent } from './dropdown-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { IconsModule } from '../icons/icons.module';

@NgModule({
  declarations: [
    DropdownMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatDividerModule,
    MatCheckboxModule,
    IconsModule,
  ],
  exports: [
    DropdownMenuComponent,
    MatMenuModule
  ]
})
export class DropdownMenuModule { }
