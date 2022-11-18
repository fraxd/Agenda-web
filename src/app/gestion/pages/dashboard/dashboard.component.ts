import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { session } from 'src/app/core/interfaces/sesion.interface';
import { User } from 'src/app/core/interfaces/User.interface';
import { StatsService } from 'src/app/core/services/profesionales/stats.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  flagProfesional:boolean = true;
  sesiones: session[] = [];
  cols: any[] = [];
  loading:boolean = true;  
  reservasToday = 0;
  reservasWeek = 0;
  lastOpen: Date;
  nombre:string;
  
  user:User = JSON.parse(localStorage.getItem('user') || (''));
  constructor( private router: Router, private afs:AngularFirestore, private statsService: StatsService ) {
    this.setearData();
   }
  ngOnInit(): void {
    let rol = localStorage.getItem('userRol') as string;
    this.afs.collection('sessions-Config').doc(this.user.uid).valueChanges().subscribe( res =>{
      if(!res && rol=='profesional') this.router.navigate(['/dashboard/disponibilidad']);
    });
    if(rol=='paciente') this.router.navigate(['/hubsalud']);
      this.statsService.getpacientesAgendadosCount(this.user.uid, localStorage.getItem('Especialidad') as string).subscribe( (res:any) => {
        this.reservasToday = res.reservasToday;
        this.reservasWeek = res.reservasWeek;
        this.lastOpen = res.fecha;
      });
    if(rol==='admin')this.flagProfesional = false;
    }

  setearData(){

    this.nombre = localStorage.getItem('nombre') as string;
    this.loading = false;
    this.cols = [
      { field: 'start', header: 'Fecha' },
      { field: 'start', header: 'Hora' },
      { field: 'pacienteUid', header: 'Paciente' },
    ]
    this.statsService.getSesiones(this.user.uid).subscribe( res =>{
      this.sesiones = res;
    });


  }

  redirect(){
    this.router.navigate(['/dashboard/agenda-disponible']);
  }
  
  redirectAbrir(){
    this.router.navigate(['/dashboard/abrir-agenda']);
  }


}
