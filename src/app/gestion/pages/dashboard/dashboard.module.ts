import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';

//Primeng Modulos
import {CardModule} from 'primeng/card';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,


    // Primeng Modulos
    CardModule,
  ]
})
export class DashboardModule { }
