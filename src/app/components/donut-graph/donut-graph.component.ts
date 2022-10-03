import { Component, Input, OnInit } from '@angular/core';

import { ChartData, ChartEvent, ChartType } from 'chart.js';


@Component({
  selector: 'app-donut-graph',
  templateUrl: './donut-graph.component.html',
  styleUrls: ['./donut-graph.component.css']
})
export class DonutGraphComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() title: string = 'Sin titulo';
  @Input() labels: string[] = ['','',''];
 

  // Doughnut
  @Input('labels') doughnutChartLabels: string[] = [ 'Data1', 'data2', 'Data3' ];
  @Input('Data') doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ] },
    ]
  };

  public doughnutChartType: ChartType = 'doughnut';

}
