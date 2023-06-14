import { Component, Input } from '@angular/core';

@Component({
  selector: 'coordinates',
  templateUrl: './coordinates.component.html',
})
export class CoordinatesComponent {

  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };

  @Input()
  latitude:number;
  @Input()
  longitude:number;
  @Input()
  zoom:number;

}
