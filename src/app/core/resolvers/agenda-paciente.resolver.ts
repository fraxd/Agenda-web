import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve} from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgendaPacienteResolver implements Resolve<Observable<any>> {

  constructor(private http:HttpClient) { }
  resolve(): Observable<any> {
    const uidProfesional = localStorage.getItem('profesionalUID');
    const especialidadProfesional = localStorage.getItem('EspecialidadProfesional');

    return this.http.get(`${ environment.urlBackEnd }/api/getAgendaProfesional?uid=${uidProfesional}&especialidad=${especialidadProfesional}`);
    

  }
}
