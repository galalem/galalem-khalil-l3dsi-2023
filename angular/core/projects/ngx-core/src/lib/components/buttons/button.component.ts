import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-button',
  template: '<button #button><ng-content></ng-content></button>',
  styleUrls: ['./button.component.css'],
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppButton implements AfterViewInit {
  @ViewChild('button') buttonRef!: ElementRef;

  constructor(
    private elementRef: ElementRef
  ) {}
  
  ngAfterViewInit () {
    const attributes = this.elementRef.nativeElement.attributes;
    const inpAttributes = this.buttonRef.nativeElement.attributes;
    for (let i = 0; i < attributes.length; ++i) {
      let attribute = attributes.item(i);
      if (attribute.name === 'ngModel' || inpAttributes.getNamedItemNS(attribute.namespaceURI, attribute.name))
        continue;
      this.buttonRef.nativeElement.setAttributeNS(attribute.namespaceURI, attribute.name, attribute.value);
    }
  }
}
