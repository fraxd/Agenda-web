import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacientesRoutingModule } from './pacientes-routing.module';

import { HubsaludComponent } from './hubsalud/hubsalud.component';
import { AgendarPacienteComponent } from './agendar-paciente/agendar-paciente.component';
import { SelectEspecialidadProfesionalComponent } from './agendar-paciente/select-especialidad-profesional/select-especialidad-profesional.component';


import {MenubarModule} from 'primeng/menubar';
import {StepsModule} from 'primeng/steps';
import { CardModule } from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {DynamicDialogModule} from 'primeng/dynamicdialog';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectHoraComponent } from './agendar-paciente/select-hora/select-hora.component';
import { ReservarComponent } from './agendar-paciente/reservar/reservar.component';



@NgModule({
  declarations: [
    HubsaludComponent,
    AgendarPacienteComponent,
    SelectEspecialidadProfesionalComponent,
    SelectHoraComponent,
    ReservarComponent
  ],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    ReactiveFormsModule,

    //PRIMENG
    MenubarModule,
    StepsModule,
    CardModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    DynamicDialogModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class PacientesModule { }
