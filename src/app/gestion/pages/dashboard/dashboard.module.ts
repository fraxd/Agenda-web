import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';

//Primeng Modulos
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,


    // Primeng Modulos
    CardModule,
    TableModule,
    ButtonModule
  ]
})
export class DashboardModule { }
