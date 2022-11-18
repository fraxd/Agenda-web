import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';

import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EditUsuarioComponent } from './usuarios/edit-usuario/edit-usuario.component';
import { ProfesionalesComponent } from './profesionales/profesionales.component';
import { AbrirAgendaComponent } from './profesionales/abrir-agenda/abrir-agenda.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {FileUploadModule} from 'primeng/fileupload';
import {TableModule} from 'primeng/table';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {CalendarModule} from 'primeng/calendar';
import { VerCitasComponent } from './ver-citas/ver-citas.component';


@NgModule({
  declarations: [
    NuevoUsuarioComponent,
    UsuariosComponent,
    EditUsuarioComponent,
    ProfesionalesComponent,
    AbrirAgendaComponent,
    VerCitasComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,


    //Modulos genericos
    FormsModule,
    ReactiveFormsModule,

    //primeng
    CardModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    FileUploadModule,
    TableModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    ToastModule,
    CalendarModule
  ]
})
export class AdminModule { }
