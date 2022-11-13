import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { DisponibilidadService } from './disponibilidad.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public rol:string = localStorage.getItem('userRol') || 'null';
  public photourl:string = localStorage.getItem('User') || 'null'; // trabajar mas adelante
  
  menu: any[] = []
  constructor(private authService: AuthService, private router:Router, private disp:DisponibilidadService) { 
    this.disp.recibirDatosBDbyUID().subscribe( res=>{
    });
    switch(this.rol){
      case 'profesional': {
        this.menu.push(
          {
            titulo: 'Profesional',
            icon: 'mdi mdi-alert',
            submenu: [
              { titulo: 'Abrir Agenda', url:'abrir-agenda'},
              { titulo: 'Agenda', url:'agenda-disponible'},
              { titulo: 'Config Disponibiidad', url:'disponibilidad'},
            ]
          }
        );
        break;
      }
      case 'admin': {
        this.menu.push(
          {
            titulo: 'Admin',
            icon: 'mdi mdi-gauge',
            submenu: [
              { titulo: 'dashboard', url:'/'},
              { titulo: 'Nuevo usuario temp', url:'nuevousuario'},
              { titulo: 'Profesionales', url:'admin/listProfesionales'},
              { titulo: 'Pacientes', url: 'list-pacientes'},
              { titulo: 'Usuarios', url: 'admin/listUsuarios'},
              { titulo: 'Citas agendadas', url: 'list-citas'}

            ]
          }
        )
        break;
      }

      default: {
        console.log('default jeje')
        break;
      }
    }
  
    
  }

  logOutSidebar(){
    this.authService.logOut();
  }
}
