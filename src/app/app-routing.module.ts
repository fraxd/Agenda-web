import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './gestion/auth/auth-routing.module';
import { NoPageFoundComponent } from './gestion/no-page-found/no-page-found.component';
import { pagesRoutingModule } from './gestion/pages-routing.module';

const routes: Routes = [
  // path: /auth AuthRoutingModule
  // path: /dashBoard pagesRoutingModule

  
  {
    path: '**',
    component: NoPageFoundComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule, // IMPORTA TODAS LAS RUTAS RELACIONADAS A LOGIN, REGISTRO, CAMBIO DE CONTRASEÑA Y VALIDAR CORREO
    pagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
