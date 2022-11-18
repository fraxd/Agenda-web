import { Component, OnInit } from '@angular/core';
import { session } from 'functions/src/interfaces/session.interface';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AgendaService } from 'src/app/core/services/agenda.service';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-modal-edit-event',
  templateUrl: './modal-edit-event.component.html',
  styleUrls: ['./modal-edit-event.component.css'],
  providers: [ConfirmationService]
})
export class ModalEditEventComponent implements OnInit {

  estadoSesion: any[]; // Array con las opciones de la cita
  statusSesion: boolean; // Estado de la sesion (True = DISPONIBLE // FALSE = OCUPADO)
  eventStart: Date;
  eventEnd: Date;
  evento: session;
  fechaApertura: string;
  nombrePaciente:string = '';
  flagSesion: boolean = false; // Por defecto False a menos que la hora ya este agendada
  constructor(public ref:DynamicDialogRef, public config: DynamicDialogConfig, private agendaService: AgendaService, 
                private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    let temp = this.config.data;
    this.evento = temp['event'];
    this.fechaApertura = temp['fecha'];
    this.setearDatos();
    if(this.evento.pacienteUID )this.agendaService.getNombrePaciente(this.evento.pacienteUID!).subscribe((resp:any)=>{
      this.nombrePaciente = resp.displayName;
    })
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
  cancelarHora(){
    this.confirmationService.confirm({
      message: '¿Estas seguro de esto?, se le notificara al paciente por correo electronico. <br> Se le ofrecera reagendar la hora por una nueva. <br><br> <b> Esto NO es REVERSIBLE.</b>',
      accept: () => {
        this.agendaService.anularSesion(this.evento.id, this.evento.pacienteUID!, this.evento.especialidad, this.evento.uid).subscribe( ()=>{
          this.ref.close(true);
        })
      },
      acceptLabel: 'Si, estoy seguro'
  });
  }

}
