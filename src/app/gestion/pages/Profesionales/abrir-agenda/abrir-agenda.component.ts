import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DisponibilidadService } from 'src/app/core/services/disponibilidad.service';
import {MessageService} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-abrir-agenda',
  templateUrl: './abrir-agenda.component.html',
  styleUrls: ['./abrir-agenda.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class AbrirAgendaComponent implements OnInit {

  lastDayOpen: Date; // esta fecha es la ultima fecha que se abrio en su ultima agenda.
  flag: boolean = false; // Para dejar un loading
  flagFecha: boolean = false; // verificar si hubo apertura previa
  temp: Observable<any>;
  fecha: Date[] = [ new Date(), new Date()]// Fecha Apertura Agenda -- En caso de existir fecha ultima agenda se define como esta
  fechaInicioTemp: Date = new Date(); // Fecha Cierre Agenda
  fechaFinTemp: Date = new Date();
  flagButton: boolean = false; // Flag para el boton de crear agenda  
  flagError: boolean = false;
  constructor(private disp:DisponibilidadService, 
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router: Router) {}
  
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
        this.fecha[0]= fecha;
        this.fecha[1]= fecha;
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
    if(this.fecha[1]){
      this.flagButton = true;
    }else{
      this.flagButton= false
      this.messageService.add({severity:'error', summary:'Debes indicar un rango de fechas.', detail:'Son dos fechas a ingresar.'});   
    }

  }
  
  //Funcion se ejecuta para llamar al servicio para la apertura de la agenda con un array de las 2 fechas seleccionadas
  // y redrigire al usuario al dashboard
  abrirAgenda(){
    this.confirmationService.confirm({
      message: '¿Esta seguro de las fechas selecionadas?',
      header: 'Confirmacion',
      accept: () =>{ // FUNCIONAL ADVERTENCIA SUBE TODO A LA DB
          this.disp.abrirAgenda(this.fecha).subscribe( res =>{
            console.log(res);
            this.messageService.add({severity:'success', summary:'Apertura de Agenda Realizada.', detail:'Se redirije al Dashboard.'});   
          });
          this.router.navigate(['\dashboard']);      
      },
      reject: () =>{
        this.messageService.add({severity:'warn', summary:'Apertura de Agenda Cancelada.', detail:'No se ha hecho ningun cambio.'});   
      }
    })
  }


}
