import { Component, OnInit } from '@angular/core';
import { CalendarOptions, defineFullCalendarElement } from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable





@Component({
  selector: 'app-agenda-disponible',
  templateUrl: './agenda-disponible.component.html',
  styleUrls: ['./agenda-disponible.component.css']
})
export class AgendaDisponibleComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    defineFullCalendarElement();
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin,timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,dayGridDay'
    },
    locale: esLocale,
    selectable: true,
  };
}
