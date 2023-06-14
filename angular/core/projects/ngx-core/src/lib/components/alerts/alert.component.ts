import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { AppIcon } from '../icons/icon.component';
import { AppButton } from '../buttons/button.component';
import { IconsModule } from '../icons/icons.module';

@Component({
  standalone: true,
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  imports: [CommonModule, IconsModule, AppIcon, AppButton],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppAlert {

  constructor(private alert: ElementRef) {}

  @Input()
  open:boolean = false;

  @Input()
  title:string="";

  @Input()
  message:string="";

  @Input()
  type:"danger"|"info"|"success"|"warning"="success";

  private _icon:string|undefined = undefined;
  get icon():string {
    if (this._icon)
      return this._icon;

    switch (this.type) {
      case "danger":
        return "ban";
      case "info":
        return "info";
      case "success":
        return "check";
      case "warning":
        return "exclamation-triangle";
    }
  }

  @Input()
  set icon(value:string|undefined) {
    this._icon = value;
  }

  public show(
    title:string, 
    message:string, 
    type:"danger"|"info"|"success"|"warning"="success",
    icon?:string
  ) {
    this.title = title;
    this.message = message;
    this.type = type;
    this.icon = icon;
    this.open = true;
    this.alert.nativeElement.scrollIntoView({behavior: 'smooth', block: 'center'});
  }

  public hide() {
    this.open = false;
  }

  @Output() close: EventEmitter<void> = new EventEmitter<void>();
}
