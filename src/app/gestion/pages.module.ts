//Modulos de angular nativos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// MODULOS EXTERNOS

// Modulos mios
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';


import { PagesComponent } from './pages.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';



@NgModule({
  declarations: [
    PagesComponent,
    NoPageFoundComponent,
    ProgressComponent,
    Grafica1Component,
    AccountSettingsComponent,
  ],
  exports: [
    PagesComponent,
    NoPageFoundComponent,
    AccountSettingsComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    ComponentsModule,
    
  ]
})
export class PagesModule { }
