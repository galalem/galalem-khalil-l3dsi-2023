import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { AbstractValueAccessor, MakeProvider } from '../form.accessor';
import { SelectOption } from '../select-input/select-input.component';

@Component({
  selector: 'select-multiple',
  templateUrl: './select-multiple.component.html',
  styleUrls: ['../form-field.component.css'],
  providers: [MakeProvider(SelectMultipleComponent)]
})
export class SelectMultipleComponent extends AbstractValueAccessor {

  faCircleXmark = faCircleXmark;

  @ViewChild('multipleSelectInput') input?: ElementRef<HTMLInputElement>;

  @Input()
  label:string="";
  @Input()
  hint:string|undefined;
  @Input()
  error:string|undefined;
  @Input("class")
  classes:string|undefined;

  @Input("text-prefix")
  textPrefix:string|undefined;
  @Input("text-suffix")
  textSuffix:string|undefined;

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











  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  add(item:any): void {
    if (!this.value)
      this.value = [];
    if (Array.isArray(this.value))
      this.value = [];

    if (item)
      if (!this.value.includes(item))
        this.value.push(item);
    this.writeValue(this.value);
  }

  remove(item: any): void {
    const index = this.value.indexOf(item);

    if (index >= 0)
      this.value.splice(index, 1);
    
  }

  entered(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    this.add(value);
    event.chipInput!.clear();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    this.add(value);
    if(this.input) this.input.nativeElement.value = '';
  }
}
