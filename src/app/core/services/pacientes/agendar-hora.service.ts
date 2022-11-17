import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { configSession } from 'functions/src/interfaces/config-session.interface';
import { environment } from '../../../../environments/environment';
import { session } from '../../interfaces/sesion.interface';
import { uuidv4 } from '@firebase/util';

@Injectable({
  providedIn: 'root'
})
export class AgendarHoraService {

  @Output() disparador: EventEmitter<any> = new EventEmitter();

  evento: session;
  profesional: any;
  uuid: string ;
  uidPaciente:string;

  constructor(private http: HttpClient) {
    let temp = JSON.parse(localStorage.getItem('user') || '') ;  
    this.uidPaciente = temp.uid;
   }

   //Retorna las especialidades existentes en la DB
  getEspecialidades() {
    return this.http.get(`${ environment.urlBackEnd}/api/especialidades`);
  }

  //Retorta un array con los profesionales de una especialidad.
  getProfesionalporEspecialidad(especialidad: string){
    if(especialidad =='Medicina General') especialidad= 'Medicina+General'
    return this.http.get<any[]>(`${ environment.urlBackEnd}/api/profesionalxespecialidades?especialidad=${especialidad}`);
  }

  //Genera el link de pago.
  postLinkPay( especialidad:string, monto:number){
    this.uuid = uuidv4();
    localStorage.setItem('idReserva',this.uuid);
    return this.http.post(`${ environment.urlBackEnd}/api/payment`,{
                               uid: this.uuid,
                                especialidad: especialidad,
                                monto: monto,
                                domain: document.domain
                               });
  }
  //Tal vez tire error por cicloso 
  getPrecioSesion(uidProfesional:string){
    this.http.get<configSession>(`${ environment.urlBackEnd}/api/getConfigAgenda?uidProfesional=${uidProfesional}`).subscribe( res =>{
      return res.valor as number;
    })

  }
  // Get and Setters
  setSesion(sesion:session){
    this.evento = sesion;  
  }
  // Get and Setters
  getSesion(){
    return this.evento;
  }
  // Get and Setters
  setProfesional(profesional:any){
    this.profesional=profesional;
  }
  // Get and Setters
  getProfesional(){
    return this.profesional;
  }


  //Regista en la DB la nueva instancia de reserva
  newSesionAgendada(){
    return this.http.post(`${ environment.urlBackEnd}/api/newSesion`,{
      uid: this.uuid,
       especialidad: this.profesional.especialidad,
       monto: this.profesional.valor,
       uidEvento: this.evento.id,
        uidProfesional: this.profesional.uid,
        nombreProfesional: this.profesional.nombre,
        timeStart: this.evento.start,
        timeEnd: this.evento.end,
        uidPaciente: this.uidPaciente,
      });  
    }

  //Fallo el pago se anula la reserva
  anularReservaTemp(uidReserva:string){
    return this.http.post(`${ environment.urlBackEnd}/api/anularReserva`,{
      uid: uidReserva,
      });  
  }

  //Se confirma el pago y se actualiza la reserva

  //Se entendera ID Evento como el original creado por el profesional
  // id Reserva como el creado al momento de generar la "reserva"
  confirmarReserva(uidReserva:string,payment_id:number,uidProfesional:string,especialidad:string,idEvento:string){
    this.http.post(`${ environment.urlBackEnd}/api/meeting`,{
      uidReserva: uidReserva,
      idEvento: idEvento,
      especialidad: especialidad,
      uidProfesional: uidProfesional,
    }).subscribe( res => console.log(res))
    return this.http.post(`${ environment.urlBackEnd}/api/confirmarReserva`,{
      uid: uidReserva,
      payment_id: payment_id,
      uidProfesional: uidProfesional,
      especialidad: especialidad,
      uidPaciente: this.uidPaciente,
      idEvento: idEvento
      });  
  
  
  }

  // Llama al backend para reagendar la cita
  reAgendar(uidReserva:string, uidEvento:string, uidProfesional:string, 
            especialidad:string,nuevoStart:string, nuevoEnd:string, nuevoEventoId:string){
    return this.http.post(`${ environment.urlBackEnd}/api/reAgendar`,{
      uidReserva: uidReserva,
      uidEvento: uidEvento,
      uidProfesional: uidProfesional,
      especialidad: especialidad,
      uidPaciente: this.uidPaciente,
      nuevoStart: nuevoStart,
      nuevoEnd: nuevoEnd,
      nuevoEventoId: nuevoEventoId
      });  
  }
}

