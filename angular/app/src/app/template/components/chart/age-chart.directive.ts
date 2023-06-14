import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Directive({
  selector: '[app-age-chart]',
})
export class AgeChartDirective implements OnInit {
  constructor(private element: ElementRef<any>) { }

  private $data:number[] = [0];
  private chart?: Chart;

  @Input()
  set data(value:number[]) {
    this.$data = value;
    if (!this.chart)
      return;
    let ages = this.labels;
    this.chart.data.labels = ages;
    this.chart.data.datasets[0].data = this.data;
  }
  get labels(): number[] {
    const min = Math.min(...this.$data);
    const max = Math.max(...this.$data);
    return Array.from(Array(max - min + 1).keys(), num => (num + min));
  }
  get data(): number[] {
    const min = Math.min(...this.$data);
    const max = Math.max(...this.$data);
    let array = Array(max - min + 1).fill(0);
    this.$data.forEach(n => array[n-min]++);
    return array;
  }


  ngOnInit(): void {
    this.chart = new Chart(this.element.nativeElement.id, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: "Ages",
            data: this.data,
            backgroundColor: "rgba(210, 214, 222, 1)",
            borderColor: 'rgba(60,141,188,0.8)', 
            pointBackgroundColor: 'rgba(60,141,188,1)', 
            pointBorderColor: '#fff', 
            tension: 0.3,
            fill:true,
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: { grid: { display: false } },
          y: { grid: { display: false }, beginAtZero: true }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
}
