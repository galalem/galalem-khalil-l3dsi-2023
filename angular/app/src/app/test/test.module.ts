import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestComponent } from './test.component';

import { DataTableModule, FormModule, AppDialog } from 'ngx-core';
import { ScheduleComponent } from '../template/components/schedule/schedule.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    CommonModule,
    DataTableModule,
    ScheduleComponent,
    FormsModule,
    ReactiveFormsModule,
    FormModule,
    AppDialog
  ],
  exports: [
    TestComponent
  ],
  providers: [],
})
export class TestModule { }
