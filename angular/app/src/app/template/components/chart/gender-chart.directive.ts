import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Directive({
  selector: '[app-gender-chart]',
})
export class GenderChartDirective implements OnInit {
  constructor(private element: ElementRef<any>) { }

  private chart?: Chart;

  private $data:{male:number,female:number} = {
    male: 0,
    female: 0
  };

  @Input()
  set data(value:{male:number,female:number}) {
    this.$data.male = value.male; 
    this.$data.female = value.female; 
    if (this.chart)
      this.chart.data.datasets[0].data = [this.$data.male, this.$data.female]
  };


  ngOnInit(): void {
    this.chart = new Chart(this.element.nativeElement.id, {
      type: 'doughnut',
      data: {
        labels: ["Male", "Femelle"],
        datasets: [
          {
            label: "",
            data: [this.$data.male, this.$data.female],
            backgroundColor:['#417dfc','#ff0000'],
          }
        ]
      },
      
      options: {
        maintainAspectRatio: false,
        responsive: true,
      }
    } as any);
  }
}
