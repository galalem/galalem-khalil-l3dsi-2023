import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgeChartDirective } from './age-chart.directive';
import { GenderChartDirective } from './gender-chart.directive';

const components = [
    AgeChartDirective,
    GenderChartDirective
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ...components
  ]
})
export class ChartModule { }
