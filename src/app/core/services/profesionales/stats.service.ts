import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { session } from '../../interfaces/sesion.interface';
 

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { }


  getpacientesAgendadosCount(uidProfesional:string, especialidad:string){
    return this.http.get<any>(`${ environment.urlBackEnd }/api/pacientesAgendadosCount?uidProfesional=${uidProfesional}&especialidad=${especialidad}`);
  }

  getSesiones(uidProfesional:string){
    return this.http.get<session[]>(`${ environment.urlBackEnd }/api/getSesionesProfesional?uidProfesional=${uidProfesional}`);


  }

}
