import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgendarHoraService } from 'src/app/core/services/pacientes/agendar-hora.service';

@Component({
  selector: 'app-fail-payment',
  templateUrl: './fail-payment.component.html',
  styleUrls: ['./fail-payment.component.css']
})
export class FailPaymentComponent implements OnInit {

  
  constructor(private router:Router, private agendaHoraService:AgendarHoraService) { }

  ngOnInit(): void {
    this.anularReserva();
  }

  handleClick(){
    this.router.navigate(['/hubsalud/agendar/']);
  }

  anularReserva(){
    let uidReserva = localStorage.getItem('idReserva') || '';
    this.agendaHoraService.anularReservaTemp(uidReserva).subscribe( res=>{
      localStorage.removeItem('idReserva');
    });
  }
}