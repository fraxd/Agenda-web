import { Component, OnInit } from '@angular/core';
import { session } from 'functions/src/interfaces/session.interface';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AgendaService } from 'src/app/core/services/agenda.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-modal-edit-event',
  templateUrl: './modal-edit-event.component.html',
  styleUrls: ['./modal-edit-event.component.css']
})
export class ModalEditEventComponent implements OnInit {

  estadoSesion: any[]; // Array con las opciones de la cita
  statusSesion: boolean; // Estado de la sesion (True = DISPONIBLE // FALSE = OCUPADO)
  eventStart: Date;
  eventEnd: Date;
  evento: session;
  flagSesion: boolean = false; // Por defecto False a menos que la hora ya este agendada
  constructor(public ref:DynamicDialogRef, public config: DynamicDialogConfig, private agendaService: AgendaService, private messageService: MessageService) { }

  ngOnInit(): void {
    let temp = this.config.data;
    this.evento = temp['event'];
    this.setearDatos();
    this.estadoSesion = [{label: 'Disponble', value: true}, {label: 'No Disponible', value: false}];
  }
  setearDatos(){
    this.statusSesion = this.evento.disponible;
    this.eventStart = new Date(this.evento.start);
    this.eventEnd = new Date(this.evento.end);
    if(this.evento.pacienteUID){
      this.flagSesion = true; // Es decir que si existe un paciente asociado NO SE PUEDE LIBERAR LA HORA POR EL MOMENTO***

    } 

  }

  submit(){
    if(this.statusSesion!=this.evento.disponible){
      this.agendaService.actulizarDatosSesion(this.evento.id,this.statusSesion);
      this.ref.close(true);
      return null;
    }
    this.ref.close(false);
    return null;

    
  }

}
