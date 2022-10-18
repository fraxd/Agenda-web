import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import { DisponibilidadService } from 'src/app/core/services/disponibilidad.service';

interface Tiempo {
  name: string,
  code: string
}

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  diasSelected: string[] = [];
  horaInicio: Date[] = []; //formato UTC 
  horaFin: Date[] = []; /// formato UTC



  tiempo: Tiempo[];
  duracion: any;
  dinero: number;  // Monto de dinero a cobrar
  comision: number = 10; // % Comision Plataforma
  montoComision: number; // Monto a descontar
  public dineroNeto: number; // Monto a recibir profesional

  constructor(private confirmationService: ConfirmationService, 
              private router:Router, 
              private dispService: DisponibilidadService ) 
              {
    this.tiempo = [
      {name: '15 Minutos', code: '15'},
      {name: '20 Minutos', code: '20'},
      {name: '30 Minutos', code: '30'},
      {name: '45 Minutos', code: '45'},
      {name: '50 Minutos', code: '50'},
      {name: '60 Minutos', code: '60'}
    ];
   }

  ngOnInit(): void {
    this.diasSelected = JSON.parse(localStorage.getItem('Dias') || ("[]"));
    this.horaInicio = JSON.parse(localStorage.getItem('horaInicio') || ("[]"));
    this.horaFin = JSON.parse(localStorage.getItem('horaFin') || ("[]"));

  }

  comisionCalcular(valor:number){
    this.montoComision=valor*(this.comision/100);
    this.dinero=valor; 
    this.dineroNeto = valor - this.montoComision;
  }

  confirm() {
    this.confirmationService.confirm({
        message: '¿Todos los datos estan correcto?',
        accept: () => {
          // Falta eliminar los datos basura del localStorage y router tal vez poner un loading o spinner y mandar al dashboard
          this.dispService.actualiarDatosBD(this.diasSelected, 
                                            this.horaInicio, 
                                            this.horaFin, 
                                            this.duracion.code, 
                                            this.dinero); 
        }
    });
  }

  retroceder(){
    this.router.navigate(['dashboard/disponibilidad/horas-atencion']);
  }
}
