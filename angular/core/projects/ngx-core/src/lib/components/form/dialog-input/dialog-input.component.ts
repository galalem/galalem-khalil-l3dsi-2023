import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { AbstractValueAccessor, MakeProvider } from "../form.accessor";

@Component({
  selector: 'dialog-input',
  templateUrl: './dialog-input.component.html',
  styleUrls: ['../form-field.component.css'],
  providers: [MakeProvider(DialogInputComponent)]
})
export class DialogInputComponent extends AbstractValueAccessor {

  faRotate = faRotate

  @Input()
  label:string="";
  @Input()
  display:string="";
  @Input()
  hint:string|undefined;
  @Input("class")
  classes:string|undefined;

  @Input()
  placeholder:string|undefined;
  @Input()
  pattern:string|RegExp|undefined;

  callDialog() {
    this.requestDialog.emit();
  }


  @Input()
  required:boolean = false;
  @Input()
  readonly:boolean = false;
  @Input()
  disabled:boolean = false;

  @Output() requestDialog:EventEmitter<void> = new EventEmitter();
}
