import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisponibilidadRoutingModule } from './disponibilidad-routing.module';
import { DiasAtencionComponent } from './dias-atencion/dias-atencion.component';

import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import { CalendarModule} from 'primeng/calendar'
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';




import { HorasAtencionComponent } from './horas-atencion/horas-atencion.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';




@NgModule({
  declarations: [
    DiasAtencionComponent,
    HorasAtencionComponent,
    ConfiguracionComponent
  ],
  imports: [
    CommonModule,
    DisponibilidadRoutingModule,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    DropdownModule,
    InputNumberModule,
    ConfirmDialogModule,
    
    
  ],
  exports:[
    DiasAtencionComponent
  ],
  providers:[
    ConfirmationService
  ]

})
export class DisponibilidadModule { }
