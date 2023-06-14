import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { DataTablePaginatorIntl } from './data-table-paginator.service';
import { DropdownMenuModule } from '../dropdown-menu/dropdown-menu.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { FormModule } from '../form/form.module';
import { FormsModule } from '@angular/forms';
import { DataTableDialogComponent } from './data-table-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { IconsModule } from '../icons/icons.module';
import { EmptyModule } from '../empty/empty.module';



@NgModule({
  declarations: [
    DataTableComponent,
    DataTableDialogComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatDialogModule,
    IconsModule,
    DropdownMenuModule,
    EmptyModule,
    RouterModule,
    FormsModule,
    FormModule,
  ],
  exports: [
    DataTableComponent,
    DataTableDialogComponent
  ],
  providers: [
    {provide: MatPaginatorIntl, useClass: DataTablePaginatorIntl}
  ],
})
export class DataTableModule { }
