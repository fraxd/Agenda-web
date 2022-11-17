import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { sesionReserva } from '../../interfaces/sesion-reserva.interface';


@Injectable({
  providedIn: 'root'
})
export class GestionService {


  sesion: sesionReserva;
  uidPaciente:string;
  constructor(private http:HttpClient) {
    this.getBasicData();
   }


  getSesiones(){
    return this.http.get<sesionReserva[]>(`${environment.urlBackEnd}/api/getSesiones?uid=${this.uidPaciente}`);
  }

  getBasicData(){
    let temp = JSON.parse(localStorage.getItem('user')|| '');
    this.uidPaciente = temp.uid;
  }

  anularSesion(idReserva:string, idProfesional: string, especialidad:string, uidEvento:string){
    return this.http.post(`${environment.urlBackEnd}/api/anularSesion`, {idReserva, idProfesional, especialidad, uidEvento});
  }

  setSesion(sesion:sesionReserva){
    this.sesion = sesion;
  }
  getSesion(){
    return this.sesion;
  }
}
