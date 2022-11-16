import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaPacienteResolver } from 'src/app/core/resolvers/agenda-paciente.resolver';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { AgendaRealizadaComponent } from './agenda-realizada/agenda-realizada.component';
import { AgendarPacienteComponent } from './agendar-paciente/agendar-paciente.component';
import { ReservarComponent } from './agendar-paciente/reservar/reservar.component';
import { SelectEspecialidadProfesionalComponent } from './agendar-paciente/select-especialidad-profesional/select-especialidad-profesional.component';
import { SelectHoraComponent } from './agendar-paciente/select-hora/select-hora.component';
import { FailPaymentComponent } from './fail-payment/fail-payment.component';
import { HubsaludComponent } from './hubsalud/hubsalud.component';


const routes: Routes = [
  {
    path: 'hubsalud',
    component: HubsaludComponent,
    data: { titulo: 'HubSalud'},
    canActivate: [AuthGuard],
    children: [
      {
        path: 'agendar',
        component: AgendarPacienteComponent,
        data: { titulo: 'Agendar Hora'},
        children:[
          {
            path: 'selectProfesional',
            component: SelectEspecialidadProfesionalComponent,
            data: { titulo: 'Seleccionar especialidad y profesional'}
          },
          {
            path: 'selectHora',
            component: SelectHoraComponent,
            data: { titulo: 'Seleccionar Hora'},
            resolve: {
              data: AgendaPacienteResolver
            },
          },
          {
            path: 'reservar/:id',
            component: ReservarComponent,
            data: { titulo: 'Reservar Hora'}
          },
          {
            path: '',
            redirectTo: 'selectProfesional',
            pathMatch: 'full'
          },
        ],

      },
      {
        path: 'failPayment',
        component: FailPaymentComponent,
        data: { titulo: 'Pago Fallido'}
      },
      {
        path: 'agendado',
        component: AgendaRealizadaComponent,
        data: { titulo: 'Agenda Realizada'}
      }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
