import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-hubsalud',
  templateUrl: './hubsalud.component.html',
  styleUrls: ['./hubsalud.component.css']
})
export class HubsaludComponent implements OnInit {

  items: MenuItem[];

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Agendar Hora',
        icon: 'pi pi-fw pi-heart',
        routerLink: ['agendar']
      },
      {
        label: 'Mis horas',
        icon: 'pi pi-fw pi-calendar',
        routerLink: ['misHoras']
      },
      {
        label: 'Editar Perfil',
        icon: 'pi pi-fw pi-user',
        routerLink: ['editProfile']

      },
      {
        label:'Cerrar Sesión',
        icon:'pi pi-fw pi-power-off',
        command:()=> this.logOut()
    }
    ]
  }

  logOut(){
    this.auth.logOut();
  }
}
