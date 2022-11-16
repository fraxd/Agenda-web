import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-agendar-paciente',
  templateUrl: './agendar-paciente.component.html',
  styleUrls: ['./agendar-paciente.component.css']
})
export class AgendarPacienteComponent implements OnInit {

  items: MenuItem[
    
  ];

  constructor() { }

  ngOnInit(): void {
    this.items = [{
      label: 'Especialidad y profesional',
      routerLink: 'selectProfesional'
  },
  {
      label: 'Horas',
      routerLink: 'selectHora'
  },
  {
      label: 'Reservar',
      routerLink: 'reservar'
  }
];
  }

  

  // Que vamos a hacer aca, vamos a poner un menu Step for step para que eliga que especialidad quiere
  // retorne el listado de profesionales de esa especialdiad y su hora mas cercana
  // por lo que sessiones details debera definir cual es la hora proxima mas cercana tal vez
  // y mostrarlos de esa forma Nombre del profesional, una foto generica tal vez y su hora mas cerca 
  // y el boton respectivo para agendar hoa

}
