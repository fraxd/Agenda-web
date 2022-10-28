import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarOptions, defineFullCalendarElement, Duration } from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable

import { AgendaService } from 'src/app/core/services/agenda.service';

import { configSession } from 'src/app/core/interfaces/config-sesion.interface';
import { session } from 'src/app/core/interfaces/sesion.interface';



@Component({
  selector: 'app-agenda-disponible',
  templateUrl: './agenda-disponible.component.html',
  styleUrls: ['./agenda-disponible.component.css']
})
export class AgendaDisponibleComponent implements OnInit {

  // Valores iniciales 
  duracionSesion: number = 1800000; // para facilitar conversion: 1 minuto = 60.000 milisegundos esto se multiplica x duracion sesion
  configAgenda: configSession;
  dias: any[] = [];
  flag: boolean = false;
  events: any[] = []
  //   {
  //     title  : 'event3',
  //     start  : '2022-10-26T12:30:00',
  //     end  : '2022-10-26T15:30:00',
  //   }
  // ];
  constructor(private agendaService:AgendaService, private _ac: ActivatedRoute) {
    const temp = _ac.snapshot.data;
    const tempaux = temp['config'];
    tempaux.config.subscribe( (res:any) =>{
      this.configAgenda = res;
    });
    tempaux.events.subscribe( (res:session[])=>{
      this.events = res;
      // por algun motivo no muesta los eventos el calendairo hacer prueba indivuduales
    })
   
  }
  
  ngOnInit(): void {
    setTimeout( ()=>{
      this.flag = true;
      console.log('pasaron 3 segundos?') 
      console.log(this.events[0]); 
      defineFullCalendarElement();
    },2000);
    console.log('red flag')

  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin,timeGridPlugin, interactionPlugin],
    initialView: 'timeGridDay',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    locale: esLocale,
    selectable: true,
    editable: true,
    slotDuration: this.duracionSesion,
    themeSystem: 'bootstrap5',
    nowIndicator: true,
    businessHours: this.getDias(), 
    hiddenDays: this.hiddenDay(), // muestra los dias de atencion segun el profesional - tal vez desactivar y habilitarlo para pacientes
    validRange: this.rangoVisualizacion(),
    events: this.returnEvents()!


    
  
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
  setearDatos(){
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

  returnEvents(){
    if(this.events.length>1) {
      console.log('se envio parece') 
      return this.events
    }
    console.log('NO SE ENVIO NADA')
    return [
      {
            title  : 'event3',
            start  : '2022-10-26T12:30:00',
            end  : '2022-10-26T15:30:00',
      },   
      {
        title: 'Consulta',
        start: '2022-10-26T14:10:00',
        end: '2022-10-26T14:31:00',
          disponible: true,
          especialidad:'Medicina General',
          id: 0.15418398382205378,
          nombreProfesional: '',
          uid: '1CKazjqO4GWMWCVpjjmTaaejist2'
      }]




  }


}
