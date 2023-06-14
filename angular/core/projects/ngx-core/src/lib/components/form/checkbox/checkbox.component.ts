import { Component, Input } from '@angular/core';
import { AbstractValueAccessor, MakeProvider } from '../form.accessor';

@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['../form-field.component.css'],
  providers: [MakeProvider(CheckboxComponent)]
})
export class CheckboxComponent extends AbstractValueAccessor {
  onChanged($event:any) {
    let val = $event.checked && this.value === false ? undefined : $event.checked;
    if (val === undefined) $event.source.checked = false;
    this.writeValue(val);
  }
  @Input()
  label:string="";
  @Input()
  hint:string|undefined;
  @Input("class")
  classes:string|undefined;

  @Input("label-on")
  checkedDisplay:string|undefined;
  @Input("label-off")
  uncheckedDisplay:string|undefined;
  @Input("label-in")
  indeterminateDisplay:string|undefined;

  get display():string|undefined {
    if (this.value === undefined)
      return this.indeterminateDisplay;
    if (this.value)
      return this.checkedDisplay;
    return this.uncheckedDisplay;
  }

  @Input()
  required:boolean = false;
  @Input()
  disabled:boolean = false;

  @Input()
  indeterminate:boolean = false;
}
