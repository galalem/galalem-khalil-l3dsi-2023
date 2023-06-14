import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AbstractValueAccessor, MakeProvider } from '../form.accessor';

type Data = {
  start: Date|null,
  end: Date|null
}

@Component({
  selector: 'date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['../form-field.component.css'],
  providers: [MakeProvider(DateRangeComponent)]
})
export class DateRangeComponent extends AbstractValueAccessor {

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

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

  @Input("start-placeholder")
  startPlaceholder:string|undefined;
  @Input("start-required")
  startRequired:boolean = false;
  @Input("start-readonly")
  startReadonly:boolean = false;
  @Input("start-disabled")
  startDisabled:boolean = false;

  @Input("end-placeholder")
  endPlaceholder:string|undefined;
  @Input("end-required")
  endRequired:boolean = false;
  @Input("end-readonly")
  endReadonly:boolean = false;
  @Input("end-disabled")
  endDisabled:boolean = false;

  override _value:any = {
    start: null,
    end: null
  }

  override get value() {
    return this._value;
  }

  @Input()
  override set value(v: any) {
    if (!v) {
      v = {
        start: null,
        end: null
      }
    }
    let change = false;
    if (!this.areEqual(v.start, this.value.start)) {
      this.range.controls.start.setValue(v.start);
      change = true;
    }
    if (!this.areEqual(v.end, this.value.end)) {
      this.range.controls.end.setValue(v.end);
      change = true;
    }      
    if (change){
      this._value = v;
      this.onChange(v);
    }
  }

  override writeValue(value: any): void {
    if (!value)
      return;
    this.range.controls.start.setValue(value.start);
    this.range.controls.end.setValue(value.end);
    super.writeValue(value)
  }

  areEqual(v1:any, v2:any):boolean {
    if (!v1)
      return !v2;
    if (!v2)
      return !v1;

    if (v1 instanceof Date && v2 instanceof Date) {
      if (isNaN(v1.valueOf()) || isNaN(v2.valueOf()))
        return false;

      v1.setHours(0,0,0,0);
      v2.setHours(0,0,0,0);
      return v1.getTime() === v2.getTime();
    }
    return false;
  }
}

