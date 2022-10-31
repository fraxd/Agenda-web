import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DisponibilidadService } from 'src/app/core/services/disponibilidad.service';

@Component({
  selector: 'app-abrir-agenda',
  templateUrl: './abrir-agenda.component.html',
  styleUrls: ['./abrir-agenda.component.css']
})
export class AbrirAgendaComponent implements OnInit {

  lastDayOpen: Date; // esta fecha es la ultima fecha que se abrio en su ultima agenda.
  flag: boolean = false; // Para dejar un loading
  flagFecha: boolean = false; // verificar si hubo apertura previa
  temp: Observable<any>;
  fecha: Date;// Fecha Apertura Agenda -- En caso de existir fecha ultima agenda se define como esta
  fechaInicioTemp: Date = new Date(); // Fecha Cierre Agenda
  fechaFinTemp: Date = new Date();
  flagButton: boolean = false; // Flag para el boton de crear agenda  
  constructor(private disp:DisponibilidadService) { 
  }
  
   ngOnInit(): void{
    this.ultimaFechaConsulta();
  }


  fechaMaxMin(){
    let fechaActual = new Date();
    if(this.lastDayOpen < fechaActual ){
      this.fechaFinTemp.setDate(fechaActual.getDate()+35);
    } else{
      this.fechaFinTemp.setDate(this.lastDayOpen.getDate()+45);
      this.fechaInicioTemp = this.lastDayOpen;
    }  
    console.log(this.fechaFinTemp)
  }

  // Ultima Fecha que realizo apertura de agenda.
  ultimaFechaConsulta(){
    let fecha : Date = new Date()
    let temp: any;
    this.disp.lastDayOpen().subscribe( res =>{
      if(res.exists){
        temp = res.data();
        fecha = temp.fecha.toDate();
        console.log('its works');
        this.flagFecha = true;
      }else console.log('No ha Abierto Agenda.');
      
    });
    setTimeout( ()=>{
      this.flag = true;
      console.log('pasaron 0.5 segundos?') 
      this.lastDayOpen = fecha;
      this.fechaMaxMin();
    },500);
  
  }

  eventCalendar(){
    this.disp.abrirAgenda();
    console.log(this.fecha);
  }

  //EL OBJETIVO ES IMPLEMENTAR QUE EL SISTEMA INDIQUE CUANDO FUE LA ULTIMA FECHA QUE ABRIO SU AGENDA
  // Y EN BASE  ESO PERMITIR ABRIR AGENDA PARA EL PROXIMO MES (PODRIA SER CON RANGO DE FECHAS)
}
