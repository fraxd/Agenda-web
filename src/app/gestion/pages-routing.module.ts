import { Routes, RouterModule } from '@angular/router';
import { Component, NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { PromesasComponent } from './pages/promesas/promesas.component';



const routes: Routes = [
  {

    path: 'dashboard',
    component: PagesComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'progress',
        component: ProgressComponent,
      },
      {
        path: 'grafica1',
        component: Grafica1Component
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent
      },
      {
        path: 'promesas',
        component: PromesasComponent,
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class pagesRoutingModule {}
