import { Component, Input } from '@angular/core';
import * as Solid from '@fortawesome/free-solid-svg-icons';
import * as Regular from '@fortawesome/free-regular-svg-icons';
import * as Brand from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'ngx-fa-icon, [ngx-fa-icon]',
  template: '<fa-icon [icon]="faIcon" [size]="faSize" [fixedWidth]="faFixedWidth" [rotate]="faRotate" [flip]="faFlip" [animation]="faAnimation" [border]="faBorder"></fa-icon>',
})
export class FontAwesomeComponent {

  private _type:"solid"|"regular"|"brand" = "solid";
  private _icon:string="";

  @Input()
  set type(value:"solid"|"regular"|"brand"|undefined) {
    this._type = value || "solid";
    if (this._icon != "")
      this.faIcon = this.extract();
  }
  @Input()
  set icon(value:string) {
    this._icon = value ? "fa"+ value.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("") : "";
    this.faIcon = this.extract();
  }

  private extract():IconProp {
    let lib;
    switch(this._type){
      case "brand":
        lib = Brand;
        break;
      case "regular":
        lib = Regular;
        break;
      default:
        lib = Solid;
    }
    return lib[this._icon as keyof typeof lib] as IconProp;
  }

  faIcon:IconProp = Solid.faFontAwesome;
  
  @Input("size")
  faSize?:any;
  
  @Input("fixed-width")
  faFixedWidth?:boolean;

  @Input("rotate")
  faRotate?:90|180|270;

  @Input("flip")
  faFlip?:"horizontal"|"vertical"|"both";

  @Input("animation")
  faAnimation?:any;

  @Input("border")
  faBorder?:boolean;

}
