import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { session } from 'src/app/core/interfaces/sesion.interface';
import { AgendarHoraService } from 'src/app/core/services/pacientes/agendar-hora.service';

interface profesional {
  nombre: string,
  sesionProxima: Date,
  uid: string,
  photo?: string,
  especialidad: string,
  valor: number
}

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})


export class ReservarComponent implements OnInit {

  checkBoolean:boolean = false;  //termino y condiciones check
  url:string; 
  profesionalDetails:profesional;       // Almacena los detalles del profesional elegido.
  evento: session;                      // Almacena los detalles del evento selecionado.
  fecha: string;
  hora: string;
  constructor(private route: ActivatedRoute, private agendarHoraService:AgendarHoraService, private router:Router) { 
    const idEvent:string = this.route.snapshot.paramMap.get('id') || '';
    this.evento= this.agendarHoraService.getSesion();
    localStorage.setItem('idEvento',this.evento.id)
    this.profesionalDetails = this.agendarHoraService.getProfesional();
    this.setearFechayHora();
    this.agendarHoraService.postLinkPay( this.profesionalDetails.especialidad,this.profesionalDetails.valor).subscribe( res =>{
      this.url = res as string;
    })
  }

  ngOnInit(): void {

    if(!this.evento.disponible &&   !this.profesionalDetails)this.router.navigate(['/hubsalud/agendar/']);
  }

  submit(){
    this.agendarHoraService.newSesionAgendada().subscribe( res=>{
      console.log(res);
    })
    window.location.href = this.url;
  }

  setearFechayHora(){
    let fechaTemp = new Date(this.evento.start);
    this.fecha = fechaTemp.toLocaleDateString();
    this.hora = fechaTemp.toLocaleTimeString();
  }
}
