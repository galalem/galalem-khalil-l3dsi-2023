import { Component, Input, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent {
  @ViewChild("slides") slides?: IonSlides;

  constructor() {
    window.addEventListener('resize', () => { this.slides?.update(); }, false);
    window.addEventListener('content-resize', () => { this.slides?.update(); }, false);
  }

  @Input()
  images: string[]=[];
}
