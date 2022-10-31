//Modulos de angular nativos
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// MODULOS EXTERNOS
import { CheckboxModule } from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';
import {StepsModule} from 'primeng/steps';
import {ProgressBarModule} from 'primeng/progressbar';

// Modulos mios
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';


import { PagesComponent } from './pages.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { PromesasComponent } from './pages/promesas/promesas.component';
import { RxjsComponent } from './pages/rxjs/rxjs.component';
import { AgendaDisponibleComponent } from './pages/Profesionales/agenda-disponible/agenda-disponible.component';
import { DisponibilidadHorariaComponent } from './pages/Profesionales/disponibilidad-horaria/disponibilidad-horaria.component';
import { DisponibilidadModule } from './pages/Profesionales/disponibilidad-horaria/disponibilidad.module';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { AbrirAgendaComponent } from './pages/Profesionales/abrir-agenda/abrir-agenda.component';



@NgModule({
  declarations: [
    PagesComponent,
    NoPageFoundComponent,
    ProgressComponent,
    Grafica1Component,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    AgendaDisponibleComponent,
    DisponibilidadHorariaComponent,
    AbrirAgendaComponent
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
    ReactiveFormsModule,
    CheckboxModule,
    ButtonModule,
    StepsModule,
    DisponibilidadModule,
    CalendarModule,
    CardModule,
    ProgressBarModule
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class PagesModule { }
