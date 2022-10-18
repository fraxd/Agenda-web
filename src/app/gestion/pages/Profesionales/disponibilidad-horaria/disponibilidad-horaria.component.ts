import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-disponibilidad-horaria',
  templateUrl: './disponibilidad-horaria.component.html',
  styleUrls: ['./disponibilidad-horaria.component.css']
})
export class DisponibilidadHorariaComponent implements OnInit {

  items: MenuItem[];

  constructor() {
    
    
   }

  ngOnInit(): void {
    this.items = [{
              label: 'Dias',
              routerLink: 'dias-atencion'
          },
          {
              label: 'Horas',
              routerLink: 'horas-atencion'
          },
          {
              label: 'Configuracion',
              routerLink: 'config-atencion'
          }
        ];
  }

  onSubmit(){
    // const dias = this.disponibilidadHoraria.value.dias;
    // const horaInicio = this.disponibilidadHoraria.value.horaInicio;
    // const horaFin = this.disponibilidadHoraria.value.horaFin;

  }
  
}


