import { Component, Input, ViewEncapsulation } from '@angular/core';
import * as Solid from '@fortawesome/free-solid-svg-icons';
import * as Regular from '@fortawesome/free-regular-svg-icons';
import * as Brand from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-icon, [app-icon]',
  template: '<fa-icon [icon]="faIcon" [size]="faSize" [fixedWidth]="faFixedWidth" [rotate]="faRotate" [flip]="faFlip" [animation]="faAnimation" [border]="faBorder"></fa-icon>',
  imports: [CommonModule, FontAwesomeModule],
  styles: [`
svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
    overflow: visible;
    box-sizing: content-box;
}
.svg-inline--fa {
    display: var(--fa-display, inline-block);
    height: 1em;
    overflow: visible;
    vertical-align: -0.125em;
}
`],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AppIcon {

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
