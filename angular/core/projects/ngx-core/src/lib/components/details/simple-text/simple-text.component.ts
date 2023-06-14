import { Component, Input } from '@angular/core';
import * as StringUtils from '../../../utils/strings';

@Component({
  selector: 'simple-text-details',
  templateUrl: './simple-text.component.html',
})
export class SimpleTextComponent {

  @Input()
  title?:string;
  @Input()
  icon?:string;
  @Input("icon-type")
  iconType?:"solid"|"regular"|"brand";
  @Input()
  text:string|undefined|null|false;
  @Input()
  fallback:string|undefined|null|false;
  @Input("empty")
  isEmpty:boolean|undefined = undefined;

  isBlank = StringUtils.isBlank;
}
