import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { sesionReserva } from 'src/app/core/interfaces/sesion-reserva.interface';
import { GestionService } from 'src/app/core/services/pacientes/gestion.service';

@Component({
  selector: 'app-todas-las-horas',
  templateUrl: './todas-las-horas.component.html',
  styleUrls: ['./todas-las-horas.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class TodasLasHorasComponent implements OnInit {

  loading: boolean = true;
  display:boolean = false;
  sesionCancelada: sesionReserva;
  sesiones: sesionReserva[] = [];
  constructor(private gestionPaciente: GestionService, private router:Router) { }

  ngOnInit(): void {
    this.gestionPaciente.getSesionesPast().subscribe((data:sesionReserva[])=>{
      this.sesiones = data;
      this.sesiones.forEach( (sesion) => {
        if(sesion.status == 'Cancelada por el profesional'){
          this.sesionCancelada = sesion;
          this.display = true;
        }
      });
      this.loading = false;
    });
  }

  reAgendar(sesion:sesionReserva){
    this.gestionPaciente.setSesion(sesion);
    localStorage.setItem('profesionalUID', sesion.uidProfesional);
    localStorage.setItem('EspecialidadProfesional',sesion.especialidad);
    this.router.navigate(['/hubsalud/reagendar']);
  }
  redirect(){
    this.router.navigate(['/hubsalud/misHoras']);
  }


}


