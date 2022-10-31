import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { PromesasComponent } from './pages/promesas/promesas.component';
import { RxjsComponent } from './pages/rxjs/rxjs.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from '../shared/auth.guard';
import { AgendaDisponibleComponent } from './pages/Profesionales/agenda-disponible/agenda-disponible.component';
import { DisponibilidadHorariaComponent } from './pages/Profesionales/disponibilidad-horaria/disponibilidad-horaria.component';
import { DiasAtencionComponent } from './pages/Profesionales/disponibilidad-horaria/dias-atencion/dias-atencion.component';
import { HorasAtencionComponent } from './pages/Profesionales/disponibilidad-horaria/horas-atencion/horas-atencion.component';
import { ConfiguracionComponent } from './pages/Profesionales/disponibilidad-horaria/configuracion/configuracion.component';
import { configSessionResolver } from '../core/resolvers/configSession.resolver';
import { AbrirAgendaComponent } from './pages/Profesionales/abrir-agenda/abrir-agenda.component';
import { abrirAgendaResolver } from '../core/resolvers/abrirAgenda.resolver';



const routes: Routes = [
  {

    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { titulo: 'Dashboard'}
        // loadChildren: () =>
        //   import('./pages/dashboard/dashboard.module').then(
        //     (m) => m.DashboardModule
        //   ),
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { titulo: 'Progress'},
      },
      {
        path: 'grafica1',
        component: Grafica1Component,
        data: { titulo: 'Grafica #1'}
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { titulo: 'Estilos'}
      },
      {
        path: 'promesas',
        component: PromesasComponent,
        data: { titulo: 'Promesas'}
      },
      {
        path: 'rxjs',
        component: RxjsComponent,
        data: { titulo: 'Rxjs'}
      },
      {
        path: 'agenda-disponible',
        component: AgendaDisponibleComponent,
        data: { titulo: 'Agenda Disponible'},
        resolve: {
          config: configSessionResolver
        }
      },
      {
        path: 'abrir-agenda',
        component: AbrirAgendaComponent,
        data: { titulo: 'Apertura Agenda'},
        resolve: {
          fecha: abrirAgendaResolver
        }
      },
      {
        path: 'disponibilidad',
        component: DisponibilidadHorariaComponent,
        data: { titulo: 'Disponibilidad Horaria'},
        children: [
          {
            path: '',
            redirectTo: 'dias-atencion',
            pathMatch: 'full'
          },
          {
          path: 'dias-atencion',
          component: DiasAtencionComponent,
          data: { titulo: 'Disponibilidad Horaria'},
          },
          {
            path: 'horas-atencion',
            component: HorasAtencionComponent,
            data: { titulo: 'Disponibilidad Horaria'},
          },
          {
            path: 'config-atencion',
            component: ConfiguracionComponent,
            data: { titulo: 'Disponibilidad Horaria'},
          }
        ]
      }

    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    // DisponibilidadRoutingModule
  ],
  exports: [RouterModule]
})
export class pagesRoutingModule {}
