import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { SelectInputComponent } from './select-input/select-input.component';
import { TextInputComponent } from './text-input/text-input.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { DateInputComponent } from './date-input/date-input.component';
import { SelectMultipleComponent } from './select-multiple/select-multiple.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateRangeComponent } from './date-range/date-range.component';
import { NumberRangeComponent } from './number-range/number-range.component';
import { DialogInputComponent } from './dialog-input/dialog-input.component';
import { IconsModule } from '../icons/icons.module';



@NgModule({
  declarations: [
    CheckboxComponent,
    DateInputComponent,
    DateRangeComponent,
    DialogInputComponent,
    NumberRangeComponent,
    SelectInputComponent,
    SelectMultipleComponent,
    TextAreaComponent,
    TextInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'fr-Fr'},
  ],
  exports: [
    CheckboxComponent,
    DateInputComponent,
    DateRangeComponent,
    DialogInputComponent,
    NumberRangeComponent,
    SelectInputComponent,
    SelectMultipleComponent,
    TextAreaComponent,
    TextInputComponent,
  ]
})
export class FormModule { }
