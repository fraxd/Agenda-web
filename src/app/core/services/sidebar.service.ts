import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public rol:string = localStorage.getItem('userRol') || 'null';
  public photourl:string = localStorage.getItem('User') || 'null'; // trabajar mas adelante

  menu: any[] = []

  constructor(private authService: AuthService, private router:Router) { 
    switch(this.rol){
      case 'paciente':  {
        this.menu.push({
          titulo: 'Paciente',
          icon: 'mdi mdi-alert',
          submenu: [
            { titulo: 'Mis Horas', url: '/'},
            { titulo: 'Agendar', url: '/'},
            { titulo: 'Modficar cita', url: '/'}
          ]
        })
        console.log(this.rol)
        break;
      }
      case 'profesional': {
        this.menu.push(
          {
            titulo: 'Profesional',
            icon: 'mdi mdi-alert',
            submenu: [
              { titulo: 'Disponibiidad', url:'disponibilidad'},
              { titulo: 'Agenda', url:'agenda-disponible'},
              { titulo: 'otro', url:'promesas'}
            ]
          }
        )
        break;
      }
      case 'admin': {
        this.menu.push(
          {
            titulo: 'Admin',
            icon: 'mdi mdi-gauge',
            submenu: [
              { titulo: 'dashboard', url:'/'},
              { titulo: 'ProgressBar', url:'progress'},
              { titulo: 'graficas', url:'grafica1'},
              { titulo: 'rxjs', url:'rxjs'},
              { titulo: 'Profesionales', url:'list-profesionales'},
              { titulo: 'Pacientes', url: 'list-pacientes'},
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
