//Modulos de angular nativos
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// MODULOS EXTERNOS
import { CheckboxModule } from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';
import {StepsModule} from 'primeng/steps';
import {ProgressBarModule} from 'primeng/progressbar';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {SelectButtonModule} from 'primeng/selectbutton';
import {InputTextModule} from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {MenubarModule} from 'primeng/menubar';
import {PasswordModule} from 'primeng/password';
import {DividerModule} from 'primeng/divider';
import {FileUploadModule} from 'primeng/fileupload';



// Modulos mios
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';


import { PagesComponent } from './pages.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { AgendaDisponibleComponent } from './pages/Profesionales/agenda-disponible/agenda-disponible.component';
import { DisponibilidadHorariaComponent } from './pages/Profesionales/disponibilidad-horaria/disponibilidad-horaria.component';
import { DisponibilidadModule } from './pages/Profesionales/disponibilidad-horaria/disponibilidad.module';

import { AbrirAgendaComponent } from './pages/Profesionales/abrir-agenda/abrir-agenda.component';
import { ModalEditEventComponent } from './pages/Profesionales/components/modal-edit-event/modal-edit-event.component';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';



@NgModule({
  declarations: [
    PagesComponent,
    NoPageFoundComponent,
    AgendaDisponibleComponent,
    DisponibilidadHorariaComponent,
    AbrirAgendaComponent,
    ModalEditEventComponent,
    EditProfileComponent,
    
    ],
  exports: [
    PagesComponent,
    NoPageFoundComponent,
    

  ],
  imports: [

    CommonModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    

    //modulos propios
    DisponibilidadModule,
    DashboardModule,

    //Primeng
    CheckboxModule,
    ButtonModule,
    StepsModule,
    CalendarModule,
    CardModule,
    ProgressBarModule,
    ToastModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    SelectButtonModule,
    InputTextModule,
    DialogModule,
    ProgressSpinnerModule,
    MenubarModule,
    PasswordModule,
    DividerModule,
    FileUploadModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class PagesModule { }
