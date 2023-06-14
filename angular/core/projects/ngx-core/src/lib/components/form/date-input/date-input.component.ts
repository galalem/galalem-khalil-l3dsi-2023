import { Component, Input } from '@angular/core';
import { AbstractValueAccessor, MakeProvider } from "../form.accessor";
import { zeros } from '../../../utils/dates';

@Component({
  selector: 'date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['../form-field.component.css'],
  providers: [MakeProvider(DateInputComponent)]
})
export class DateInputComponent extends AbstractValueAccessor {

  onDateChange($event:any) {
    if ($event.value)
      this.writeValue($event.value.getFullYear()+'-'+zeros($event.value.getMonth() + 1)+'-'+zeros($event.value.getDate()));
    else
      this.writeValue(undefined)    
  }
  model:Date=new Date;

  @Input()
  label:string="";
  @Input()
  hint:string|undefined;
  @Input("class")
  classes:string|undefined;

  @Input()
  required:boolean = false;
  @Input()
  readonly:boolean = false;
  @Input()
  disabled:boolean = false;
}
