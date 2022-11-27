import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../core/services/settings.service';
import {MenuItem} from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { User } from '@angular/fire/auth';

// @ts-ignore
declare function customInitFunctions():void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {

  items: MenuItem[];
  public rol:string = localStorage.getItem('userRol') || 'null';
  nombreUsuario: string = 'Usuario';
  constructor(private router:Router, private auth:AuthService) { }

  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('nombre') as string || 'Usuario';
    console.log(this.nombreUsuario)
    customInitFunctions();

    if(this.rol==='profesional'){
      this.items = [
        {
            label: 'Abrir Agenda',
            icon: 'pi pi-fw pi-plus',
            routerLink: 'abrir-agenda'
        },
        {
            label: 'Agenda',
            icon: 'pi pi-fw pi-calendar',
            routerLink: 'agenda-disponible'
        },
        {
          label: 'Config Disponibilidad',
          icon: 'pi pi-fw pi-pencil',
          routerLink: 'disponibilidad'
        },
        {
          label: 'Editar perfil',
          icon: 'pi pi-fw pi-user',
          routerLink: 'editar-perfil'
        },
        {
          label:'Cerrar Sesión',
          icon:'pi pi-fw pi-power-off',
          command:()=> this.logOut()
        }
        ];
    }
    
    if(this.rol==='admin'){
      this.items = [
        {
            label: 'dashboard',
            icon: 'pi pi-fw pi-plus',
            routerLink: '/'
        },
        {
          label: 'Profesionales',
          icon: 'pi pi-fw pi-users',
          routerLink: 'admin/listProfesionales'
        },
        {
          label: 'Pacientes',
          icon: 'pi pi-fw pi-users',
          routerLink: 'admin/listPacientes'
        },
        {
          label: 'Usuarios',
          icon: 'pi pi-fw pi-users',
          routerLink: 'admin/listUsuarios'
        },
        {
          label: 'Editar perfil',
          icon: 'pi pi-fw pi-user',
          routerLink: 'editar-perfil'
        },
        {
          label:'Cerrar Sesión',
          icon:'pi pi-fw pi-power-off',
          command:()=> this.logOut()
        }

        
        ];
    }


  }

  logOut(){
    this.auth.logOut();
  }
}
