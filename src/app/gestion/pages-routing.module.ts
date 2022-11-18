import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
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
import { profesionalGuard } from '../shared/profesional.guard';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';



const routes: Routes = [
  {

    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      //** Componentes Comunes  */ sujeto a revision -----------
      {
        path: '',
        component: DashboardComponent,
        data: { titulo: 'Dashboard'}
      },
      // PROFESIONAL OPCIONES ******* ------
      {
        path: 'agenda-disponible',
        component: AgendaDisponibleComponent,
        data: { titulo: 'Agenda Disponible'},
        canActivate: [profesionalGuard],
        resolve: {
          config: configSessionResolver
        }
      },
      {
        path: 'abrir-agenda',
        component: AbrirAgendaComponent,
        data: { titulo: 'Apertura Agenda'},
        canActivate: [profesionalGuard],
        resolve: {
          fecha: abrirAgendaResolver
        }
      },
      {
        path: 'disponibilidad',
        component: DisponibilidadHorariaComponent,
        data: { titulo: 'Disponibilidad Horaria'},
        canActivate: [profesionalGuard],
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
      },
      {
        path: 'editar-perfil',
        component: EditProfileComponent,
        data: { titulo: 'Editar Perfil'},
      },
      {
        path: 'admin',
        loadChildren : () =>  import('./pages/admin/admin-routing.module').then(m => m.AdminRoutingModule)
      }

    ],
    
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class pagesRoutingModule {}
