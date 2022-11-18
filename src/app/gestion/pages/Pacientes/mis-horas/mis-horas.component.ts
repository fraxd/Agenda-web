import { Component, OnInit } from '@angular/core';
import { sesionReserva } from 'src/app/core/interfaces/sesion-reserva.interface';
import { GestionService } from 'src/app/core/services/pacientes/gestion.service';
import {ConfirmationService} from 'primeng/api';
import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mis-horas',
  templateUrl: './mis-horas.component.html',
  styleUrls: ['./mis-horas.component.css'],
  providers: [ConfirmationService,MessageService]
})
export class MisHorasComponent implements OnInit {

  loading: boolean = true;
  col: any[];
  display:boolean = false;
  sesionCancelada: sesionReserva;
  sesiones: sesionReserva[] = [];
  constructor(private gestionPaciente: GestionService, private confirmationService:ConfirmationService, 
              private messageService: MessageService, private router:Router) { }

  ngOnInit(): void {
    this.col =[
      {field: 'especialidad', header: 'Especialidad'},
      {field: 'nombreProfesional', header: 'Profesional'},
      {field: 'timeStart', header: 'fecha'},

    ]
    this.gestionPaciente.getSesiones().subscribe((data:sesionReserva[])=>{
      this.sesiones = data;
      this.sesiones.forEach( (sesion) => {
        console.log(sesion.status)
        if(sesion.status == 'Cancelada por el profesional'){
          this.sesionCancelada = sesion;
          this.display = true;
          //this.messageService.add({severity:'info', summary:'Cita Cancelada', detail:'La cita con el profesional '+sesion.nombreProfesional+' fue cancelada por el profesional.'});
        }
      });
      this.loading = false;
      if(this.sesiones.length == 0){
        this.messageService.add({severity:'info', summary:'No tienes sesiones Agendadas.', detail:'Te redirigiremos a Agendar Hora.'});
        setTimeout(()=>{
          this.router.navigate(['/hubsalud/agendar']);
        },3700);
      }
    });
  }

  navigate(url:string){
    if(url)window.open(url, "_blank");
  }

  reAgendar(sesion:sesionReserva){
    this.gestionPaciente.setSesion(sesion);
    localStorage.setItem('profesionalUID', sesion.uidProfesional);
    localStorage.setItem('EspecialidadProfesional',sesion.especialidad);
    this.router.navigate(['/hubsalud/reagendar']);
  }

  anular(sesion:sesionReserva){
    this.confirmationService.confirm({
      message: '¿Esta seguro de llevar a cabo esto? No se puede revertir.',
      accept: () => {
        this.gestionPaciente.anularSesion(sesion.uidReserva, sesion.uidProfesional, sesion.especialidad, sesion.uidEvento).subscribe( ()=>{
          this.messageService.add({severity:'success', summary:'Se anulo la cita ya.', detail:'En 72 horas se efectura el reembolso.'});
        });
      },
      reject: () => {
        this.messageService.add({severity:'info', summary:'Cancelado', detail:'No se anulo la cita.'});
      },
      acceptLabel: 'Estoy Segurisimo.'
  });

  }

}


/// RETORNA LOS DATOS BIEN ASI QUE VAMOS MEJORANDO JAJA

