import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgendarHoraService } from 'src/app/core/services/pacientes/agendar-hora.service';

@Component({
  selector: 'app-agenda-realizada',
  templateUrl: './agenda-realizada.component.html',
  styleUrls: ['./agenda-realizada.component.css']
})
export class AgendaRealizadaComponent implements OnInit {

  uidProfesional:string;
  especialidad:string;
  idEvento:string;
  uidReserva:string;
  payment_id:number
  constructor(private router:Router,private agendarHoraService:AgendarHoraService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.uidProfesional = localStorage.getItem('profesionalUID') || '';
    this.especialidad = localStorage.getItem('EspecialidadProfesional')|| '';
    this.idEvento = localStorage.getItem('idEvento')|| '';
    this.route.queryParams.subscribe(params => {
      this.uidReserva = params['external_reference'];
      this.payment_id = params['payment_id'];
    })

    setTimeout(() => {
      this.agendarHoraService.confirmarReserva(this.uidReserva,this.payment_id,this.uidProfesional,this.especialidad,this.idEvento)
            .subscribe( res =>{
              console.log(res);
            })  
    }, 700);



    





  }

  handleClick(){
    this.router.navigate(['/hubsalud']);

  }
}
