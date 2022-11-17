import { Component, OnInit } from '@angular/core';
import { CalendarOptions, defineFullCalendarElement, EventClickArg } from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import { session } from 'src/app/core/interfaces/sesion.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AgendarHoraService } from 'src/app/core/services/pacientes/agendar-hora.service';
import { sesionReserva } from 'src/app/core/interfaces/sesion-reserva.interface';
import { GestionService } from 'src/app/core/services/pacientes/gestion.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-re-agendar',
  templateUrl: './re-agendar.component.html',
  styleUrls: ['./re-agendar.component.css'],
  providers: [MessageService]
})
export class ReAgendarComponent implements OnInit {

  displayResponsive: boolean = false;
  events: any[] = [];
  evento: sesionReserva;
  fecha:string;
  hora:string;
  nuevoStart:string;
  nuevoEnd:string;
  nuevoEventoId:string;

  constructor( private _ac:ActivatedRoute, private router:Router, private agendaService: AgendarHoraService, 
              private paciente: GestionService, private messageService: MessageService ) {
    let temp = _ac.snapshot.data;
    let sesiones:session[] = temp['data'];
    this.events = sesiones;
    this.calendarOptions.events = sesiones;
    this.evento = this.paciente.getSesion();
   }

  ngOnInit(): void {
    if(!this.evento)this.router.navigate(['/hubsalud']);
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
    this.fecha = new Date(evento.start).toLocaleDateString();
    this.hora = new Date(evento.start).toLocaleTimeString();
    this.nuevoStart = evento.start;
    this.nuevoEnd = evento.end;
    this.nuevoEventoId = evento.id;
    this.displayResponsive = true;

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

  reAgendar(){
    this.messageService.add({severity:'success', summary:'Re-Agendamiento en proceso...', detail:'Seras redirigido al hubSalud'});
    this.agendaService.reAgendar(this.evento.uidReserva, this.evento.uidEvento, this.evento.uidProfesional, this.evento.especialidad,
                            this.nuevoStart, this.nuevoEnd, this.nuevoEventoId).subscribe( res =>{
                              console.log(res)
                              this.router.navigate(['/hubsalud/misHoras']);
                            })
  }


}
