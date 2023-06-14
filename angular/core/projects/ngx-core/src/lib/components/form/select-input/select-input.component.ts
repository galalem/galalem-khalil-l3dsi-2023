import { Component, Input } from '@angular/core';
import { AbstractValueAccessor, MakeProvider } from "../form.accessor";

export class SelectOption {
  value:any;
  label:string="";
  disabled?:boolean;
}

@Component({
  selector: 'select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['../form-field.component.css'],
  providers: [MakeProvider(SelectInputComponent)]
})
export class SelectInputComponent extends AbstractValueAccessor {
  @Input()
  label:string="";
  @Input()
  hint:string|undefined;
  @Input("class")
  classes:string|undefined;

  @Input("text-prefix")
  textPrefix:string|undefined;
  @Input("text-suffix")
  textSuffix:string|undefined;

  @Input()
  required:boolean = false;
  @Input()
  disabled:boolean = false;
  @Input()
  native:boolean = false;

  private _options:SelectOption[]=[];

  @Input()
  set options(value: SelectOption[]|any[]|undefined){

    if (value instanceof Array<SelectOption>)
      this._options = value;
    else if (Array.isArray(value))
      this._options = (value as any[]).map((item) => { return {value:item, label:`${item}`} as SelectOption });
    else
      this._options = [];
  }
  get options():SelectOption[] {
    return this._options;
  }
}
