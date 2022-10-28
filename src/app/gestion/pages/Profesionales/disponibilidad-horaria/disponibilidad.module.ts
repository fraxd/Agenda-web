import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing Module de Dip
//import { DisponibilidadRoutingModule } from './disponibilidad-routing.module';
// Componentes 
import { DiasAtencionComponent } from './dias-atencion/dias-atencion.component';
import { HorasAtencionComponent } from './horas-atencion/horas-atencion.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';

// PrimeNG modules
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import { CalendarModule} from 'primeng/calendar'
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';





@NgModule({
  declarations: [
    DiasAtencionComponent,
    HorasAtencionComponent,
    ConfiguracionComponent
  ],
  imports: [
    CommonModule,
    // PRIMENG
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
