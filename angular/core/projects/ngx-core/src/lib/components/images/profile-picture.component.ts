import { Component, Input } from '@angular/core';

@Component({
  selector: 'profile-picture',
  template: '<img part="native" [src]="src | secure | async" [alt]="alt" [class]="imgClass" [style]="imgStyle"/>',
})
export class ProfilePictureComponent {


  private _src:string="";
  get src():string {
    return this._src;
  }
  @Input()
  set src(value:string|undefined|null|false){
    this._src = value ? value : `assets/img/default-avatar-${this.gender === 'FEMALE' ? 'fe':''}male.png`;
  }
  @Input()
  alt:string="";

  @Input()
  gender:"FEMALE"|"MALE"|undefined|null|false="MALE";

  @Input("class-native")
  imgClass:string="";
  @Input("style-native")
  imgStyle:string="";
}
