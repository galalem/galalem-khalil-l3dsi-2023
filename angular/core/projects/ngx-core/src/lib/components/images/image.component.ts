import { Component, Input } from '@angular/core';

@Component({
  selector: 'image',
  template: '<img part="native" [src]="src | secure | async" [alt]="alt" [class]="imgClass" [style]="imgStyle"/>',
})
export class ImageComponent {

  @Input()
  src:string="";
  @Input()
  alt:string="";
  @Input("class-native")
  imgClass:string="";
  @Input("style-native")
  imgStyle:string="";

}
