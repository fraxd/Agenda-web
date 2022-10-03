import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  labels1: string[] = [ 'Drogas', 'dulces', 'caramelos' ];

  data: ChartData<'doughnut'> = {
    labels: this.labels1,
    datasets: [
      { data: [ 900, 450, 500 ] },
    ]
  };


}
