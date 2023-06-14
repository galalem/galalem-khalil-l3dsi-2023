import { Component, Input } from '@angular/core';
import { AbstractValueAccessor, MakeProvider } from "../form.accessor";

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['../form-field.component.css'],
  providers: [MakeProvider(TextInputComponent)]
})
export class TextInputComponent extends AbstractValueAccessor {
  @Input()
  label:string="";
  @Input()
  hint:string|undefined;
  @Input("class")
  classes:string|undefined;

  @Input()
  placeholder:string|undefined;
  @Input()
  pattern:string|RegExp|undefined;
  @Input()
  minlength:number|undefined;
  @Input()
  maxlength:number|undefined;
  @Input("text-prefix")
  textPrefix:string|undefined;
  @Input("text-suffix")
  textSuffix:string|undefined;
  @Input()
  counter:boolean|undefined;

  @Input()
  required:boolean = false;
  @Input()
  readonly:boolean = false;
  @Input()
  disabled:boolean = false;

  private _type:string = "text";
  @Input()
  set type(value:string){
    this._type = ['text', 'email', 'phone', 'url', 'password', 'number', 'color'].includes(value) ? value : 'text';
  }
  get type():string {
    return this._type;
  }
}
