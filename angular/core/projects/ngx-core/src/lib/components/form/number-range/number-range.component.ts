import { Component, Input } from '@angular/core';
import { AbstractValueAccessor, MakeProvider } from '../form.accessor';

@Component({
  selector: 'number-range',
  templateUrl: './number-range.component.html',
  styleUrls: ['../form-field.component.css'],
  providers: [MakeProvider(NumberRangeComponent)]
})
export class NumberRangeComponent extends AbstractValueAccessor {

  onMinChanged($event: any): void {
    this.writeValue({min: $event.target.valueAsNumber, max: this.value?.max})
  }
  onMaxChanged($event: any): void {
    this.writeValue({min: this.value?.min, max: $event.target.valueAsNumber})
  }

  @Input()
  label:string="";
  @Input()
  hint:string|undefined;
  @Input("class")
  classes:string|undefined;

  @Input()
  min:number|undefined;
  @Input()
  max:number|undefined;

  @Input()
  required:boolean = false;
  @Input()
  readonly:boolean = false;
  @Input()
  disabled:boolean = false;

  @Input("start-required")
  startRequired:boolean = false;
  @Input("start-readonly")
  startReadonly:boolean = false;
  @Input("start-disabled")
  startDisabled:boolean = false;

  @Input("end-required")
  endRequired:boolean = false;
  @Input("end-readonly")
  endReadonly:boolean = false;
  @Input("end-disabled")
  endDisabled:boolean = false;
}
