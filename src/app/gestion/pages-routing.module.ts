import { Routes, RouterModule } from '@angular/router';
import { Component, NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { PromesasComponent } from './pages/promesas/promesas.component';
import { RxjsComponent } from './pages/rxjs/rxjs.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from '../shared/auth.guard';



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
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class pagesRoutingModule {}
