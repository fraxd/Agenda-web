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
import { ModalEditEventComponent } from '../components/modal-edit-event/modal-edit-event.component'


@Component({
  selector: 'app-agenda-disponible',
  templateUrl: './agenda-disponible.component.html',
  styleUrls: ['./agenda-disponible.component.css'],
  providers: [DialogService, MessageService]
})
export class AgendaDisponibleComponent implements OnInit {

  // Valores iniciales 
  configAgenda: configSession;
  dias: any[] = [];
  flag: boolean = false;
  events: any[] = [];
  ref: DynamicDialogRef;
  displayModal: boolean = true;

  constructor(private agendaService: AgendaService,
    private _ac: ActivatedRoute,
    public dialogService: DialogService,
    public messageService: MessageService) {
    const temp = _ac.snapshot.data;
    const tempaux = temp['config'];
    tempaux.config.subscribe((res: any) => {
      this.configAgenda = res;
    });
    tempaux.events.subscribe((res: session[]) => {
      this.calendarOptions.events = res;
      this.events = res;
      this.flag = true;
    });
    let modalBoolean = localStorage.getItem('modalAgenda') as string;
    if(modalBoolean === 'true') this.displayModal = false;
    console.log(modalBoolean);

  }

  ngOnInit(): void {
    if (!customElements.get('full-calendar')) defineFullCalendarElement();
  }

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
    themeSystem: 'bootstrap5',
    nowIndicator: true,
    validRange: this.rangoVisualizacion(),
    eventClick: (infoEvent) => this.eventoDetails(infoEvent),
    height: 'auto'

  };

  rangoVisualizacion() {  // Se define que el usuario podra ver maximo 40 dias en adelante el calendario
    const now = new Date();
    let varEnd = new Date();
    varEnd.setDate(varEnd.getDate() + 40);

    return {
      start: now,
      end: varEnd
    }
  }

  eventoDetails(infoEvent: EventClickArg) { // Modal que permite editar el evento
    let evento: session = this.returnEvento(infoEvent.event.id);
    let fecha;
    if (evento.fechaTomada) fecha = new Date(evento.fechaTomada!).toLocaleString();
    this.ref = this.dialogService.open(ModalEditEventComponent, {
      header: 'Editar Sesion',
      width: '70%',
      data: {
        event: evento,
        fecha: fecha
      },
      contentStyle: { "overflow": "auto" },
      baseZIndex: 10000,
      maximizable: false

      //  implementar el que pasara si alguien tiene la hora, si se puede reagendar manualmente
      // y si la hora esta agendada tal vez bloquear edicion
      // Idea: OFRECER AL PROFESIONAL CANCELAR LA HORA Y ENVIAR CORREO AL PACIENTE DICIENDO SORRY K LATA NOMAS
    });

    this.ref.onClose.subscribe((res: boolean) => {
      if (res) {
        this.messageService.add({ severity: 'success', summary: 'Sesion Actualizada', detail: 'Via Agenda' });

      }

    })
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
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  displayModalNotMore(){
    this.displayModal = false;
    localStorage.setItem('modalAgenda', 'true');
  }

}
