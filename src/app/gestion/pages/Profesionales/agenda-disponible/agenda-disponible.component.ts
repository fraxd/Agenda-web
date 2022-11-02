import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarOptions, defineFullCalendarElement, EventClickArg } from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable

import { AgendaService } from 'src/app/core/services/agenda.service';

import { configSession } from 'src/app/core/interfaces/config-sesion.interface';
import { session } from 'src/app/core/interfaces/sesion.interface';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import {ModalEditEventComponent } from '../components/modal-edit-event/modal-edit-event.component'


@Component({
  selector: 'app-agenda-disponible',
  templateUrl: './agenda-disponible.component.html',
  styleUrls: ['./agenda-disponible.component.css'],
  providers: [DialogService,MessageService]
})
export class AgendaDisponibleComponent implements OnInit {

  // Valores iniciales 
  duracionSesion: number = 1800000; // para facilitar conversion: 1 minuto = 60.000 milisegundos esto se multiplica x duracion sesion
  configAgenda: configSession;
  dias: any[] = [];
  flag: boolean = false;
  events: any[] = [];
  ref: DynamicDialogRef;


  constructor(private agendaService:AgendaService, 
              private _ac: ActivatedRoute, 
              public dialogService: DialogService, 
              public messageService: MessageService) 
              {
    const temp = _ac.snapshot.data;
    const tempaux = temp['config'];
    tempaux.config.subscribe( (res:any) =>{
      this.configAgenda = res;
    });
    tempaux.events.subscribe( (res:session[])=>{
      this.events = res;
      console.log(this.events)
    })
   
  }
  
  ngOnInit(): void {
    defineFullCalendarElement();
    setTimeout( ()=>{
      this.flag = true;
      this.calendarOptions.events = this.events;
    },2000);
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin,timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    locale: esLocale,
    selectable: true,
    editable: false,
    slotDuration: this.duracionSesion,
    themeSystem: 'bootstrap5',
    nowIndicator: true,
    businessHours: this.getDias(), 
    hiddenDays: this.hiddenDay(), // muestra los dias de atencion segun el profesional - tal vez desactivar y habilitarlo para pacientes
    validRange: this.rangoVisualizacion(),
    eventClick: (infoEvent) => this.eventoDetails(infoEvent)


    
  
  };

  hiddenDay(){  // retorna del localStorage los dias que el profesional no atiende
    const dias = JSON.parse( (localStorage.getItem('NoAtencion') || ''));
    localStorage.removeItem('NoAtencion');
    return dias
  }
  getDias(){ // retorna un array con los dias que atiende el profesional y su rango de horarios 
                                                  // no necesariamente retorna la disponibilda real
    const dias = JSON.parse( (localStorage.getItem('Dias') || ''));
    localStorage.removeItem('Dias');
    return dias

  }
  setearDatos(){ // pone la durecion de ms a minutos
    this.duracionSesion = this.configAgenda.duracion * 60000;
    // dejo hasta aqui hasta saber que mas implementar      
    }
  
  rangoVisualizacion(){  // Se define que el usuario podra ver maximo 40 dias en adelante el calendario
    const now = new Date();
    let varEnd = new Date();
    varEnd.setDate(varEnd.getDate() + 40);

    return{
      start: now,
      end: varEnd
    }
  }

  eventoDetails(infoEvent:EventClickArg){
    // LA IDEA ES QUE OBTENGA EL EVENTO ACA Y LO ENVIE SOLITO AL MODAL
    // IMPLEMENTAR QUE EL NOMBRE DE LOS DOCUMENTOS DE LAS SESIONES SEAN IGUALES A LOS ID 
    this.ref = this.dialogService.open(ModalEditEventComponent, {
      header: 'Editar Sesion',
      width: '70%',
      data: {
        id: infoEvent.event.id as string
      },
      contentStyle: {"overflow": "auto"},
      baseZIndex: 10000,
      maximizable: false

      //HASTA HORA LO EDITABLE SERIA PONERLA COMO BLOQUEADA
      // despues implementar el que pasara si alguien tiene la hora, si se puede reagendar manualmente
      // y si la hora esta agendada tal vez bloquear edicion
    });
  }

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }
}
