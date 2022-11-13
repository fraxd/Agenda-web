import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-hubsalud',
  templateUrl: './hubsalud.component.html',
  styleUrls: ['./hubsalud.component.css']
})
export class HubsaludComponent implements OnInit {

  items: MenuItem[];

  constructor() { }

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
      },
      {
        label: 'Editar Perfil',
        icon: 'pi pi-fw pi-user'
      }
    ]
  }

}
