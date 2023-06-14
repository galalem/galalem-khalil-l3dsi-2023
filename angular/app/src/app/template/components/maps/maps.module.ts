import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { CoordinatesComponent } from './coordinates/coordinates.component';



@NgModule({
  declarations: [
    CoordinatesComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule
  ],
  exports: [
    CoordinatesComponent
  ]
})
export class MapsModule { }
