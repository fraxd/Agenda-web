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
import {CheckboxModule} from 'primeng/checkbox';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputNumberModule} from 'primeng/inputnumber';
import {SkeletonModule} from 'primeng/skeleton';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectHoraComponent } from './agendar-paciente/select-hora/select-hora.component';
import { ReservarComponent } from './agendar-paciente/reservar/reservar.component';
import { FailPaymentComponent } from './fail-payment/fail-payment.component';
import { AgendaRealizadaComponent } from './agenda-realizada/agenda-realizada.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';



@NgModule({
  declarations: [
    HubsaludComponent,
    AgendarPacienteComponent,
    SelectEspecialidadProfesionalComponent,
    SelectHoraComponent,
    ReservarComponent,
    FailPaymentComponent,
    AgendaRealizadaComponent,
    EditProfileComponent
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
    DynamicDialogModule,
    CheckboxModule,
    ProgressBarModule,
    InputNumberModule,
    SkeletonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class PacientesModule { }
