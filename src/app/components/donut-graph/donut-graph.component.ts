import { Component, OnInit } from '@angular/core';

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
  // Doughnut
  public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ] },
    ]
  };

  public doughnutChartType: ChartType = 'doughnut';

}
