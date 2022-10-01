import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './gestion/auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './gestion/auth/pages/register-page/register-page.component';
import { DashboardComponent } from './gestion/dashboard/dashboard.component';
import { NoPageFoundComponent } from './gestion/no-page-found/no-page-found.component';
import { PagesComponent } from './gestion/pages.component';

const routes: Routes = [
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  // },
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./gestion/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: 'login',
    component: LoginPageComponent // para dejarlo como esta comentar esta linea y descomentar las siguientes 2.
    // loadChildren: () =>
    //   import('./gestion/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: '**',
    component: NoPageFoundComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
