import { Component, OnInit } from '@angular/core';
import { AgendarHoraService } from 'src/app/core/services/pacientes/agendar-hora.service';

// Imports para el calendario
import { CalendarOptions, defineFullCalendarElement, EventClickArg } from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import { ActivatedRoute, Router } from '@angular/router';
import { session } from 'src/app/core/interfaces/sesion.interface';


@Component({
  selector: 'app-select-hora',
  templateUrl: './select-hora.component.html',
  styleUrls: ['./select-hora.component.css']
})
export class SelectHoraComponent implements OnInit {

  events: any[] = [];
  nombreProfesional: string;
  constructor( private _ac:ActivatedRoute, private router:Router, private agendaService: AgendarHoraService) {
    let temp = _ac.snapshot.data;
    let sesiones:session[] = temp['data'];
    this.events = sesiones;
    this.calendarOptions.events = sesiones;
    this.nombreProfesional = localStorage.getItem('NombreProfesional') as string || 'Profesional';

   }

  ngOnInit(): void {
    if(!customElements.get('full-calendar')) defineFullCalendarElement(); // verifica que no este inicializado ya.

  }


  // configuracion Basica de FUllCalendar
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    locale: esLocale,
    selectable: true,
    editable: false,
    nowIndicator: true,
    validRange: this.rangoVisualizacion(),
    scrollTime: '08:00:00',
    eventClick: (infoEvent) => this.eventoDetails(infoEvent),



  };

  rangoVisualizacion() {  // Se define que el usuario podra ver maximo 45 dias en adelante el calendario
    const now = new Date();
    let varEnd = new Date();
    varEnd.setDate(varEnd.getDate() + 45);

    return {
      start: now,
      end: varEnd
    }
  }

  eventoDetails(infoEvent: EventClickArg) {
    let evento = this.returnEvento(infoEvent.event.id);
    this.agendaService.setSesion(evento);
    console.log(evento.start)

    this.router.navigate(['/hubsalud/agendar/reservar', infoEvent.event.id]);
  }

  returnEvento(id: string) {
    let eventoReturn: session
    this.events.forEach(function (evento) {
      if (evento.id == id) {
        eventoReturn = evento as session;
      }
    });
    return eventoReturn!
  }

  goBack(){
    this.router.navigate(['/hubsalud/agendar']);
  }
}
