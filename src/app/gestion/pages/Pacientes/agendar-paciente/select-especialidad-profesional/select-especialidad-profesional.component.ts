import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from 'src/app/core/interfaces/User.interface';
import { AgendarHoraService } from 'src/app/core/services/pacientes/agendar-hora.service';

interface profesional {
  nombre: string,
  sesionProxima: Date,
  uid: string,
  photo?: string,
  especialidad: string
}
@Component({
  selector: 'app-select-especialidad-profesional',
  templateUrl: './select-especialidad-profesional.component.html',
  styleUrls: ['./select-especialidad-profesional.component.css'],
  providers: [MessageService, DialogService]
})

export class SelectEspecialidadProfesionalComponent implements OnInit {

  @Input()
  profesional:profesional; // Profesioanl Elegido y enviado a selectHora

  especialidades: any[];        // Array con las especialidades
  selectEspecialidad: any;   //Especialidad Selecionada
  especialidadFlag: boolean = false;
  fecha: Date = new Date(5000000)
  


  profesionales: profesional[];
  constructor( private agendaHoraService: AgendarHoraService, private router:Router) {
    // Falta implementar algo decente
    let fecha: Date = new Date(5000000)
    this.profesionales = [];
   }

  ngOnInit(): void {
    this.agendaHoraService.getEspecialidades().subscribe( (res:any) =>{
      this.especialidades = res
    });
  }

  // IMPLEMENTAR TAL VEZ LA FUNCION QUE TRAIGA LA DURACION DE LA SESION Y EL VALOR.
  buscarDataprofesionales(event : any){
    console.log(event.value.especialidad);
    this.agendaHoraService.getProfesionalporEspecialidad(event.value.especialidad).subscribe( (res) =>{
      res.forEach( (usuario) =>{
        this.profesionales.push(
          {
            nombre: usuario.displayName,
            sesionProxima: this.fecha,
            photo: usuario.photoURL,
            uid: usuario.uid,
            especialidad: event.value.especialidad
          }
        );
      })
      this.especialidadFlag = true;
    });
  }

  modalProfesional(profesionalVar:profesional){
    this.profesional = profesionalVar;
    localStorage.setItem('profesionalUID', this.profesional.uid);
    localStorage.setItem('EspecialidadProfesional', this.profesional.especialidad);
    this.agendaHoraService.disparador.emit({
      data: this.profesional
    });
    this.router.navigate(['/hubsalud/agendar/selectHora']);
  }

}
