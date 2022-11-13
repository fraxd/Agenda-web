import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { User } from '../../interfaces/User.interface';

@Injectable({
  providedIn: 'root'
})
export class AgendarHoraService {

  @Output() disparador: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getEspecialidades() {
    return this.http.get(`${ environment.urlBackEnd}/api/especialidades`);
  }

  getProfesionalporEspecialidad(especialidad: string){
    if(especialidad =='Medicina General') especialidad= 'Medicina+General'
    return this.http.get<User[]>(`${ environment.urlBackEnd}/api/profesionalxespecialidades?especialidad=${especialidad}`);
  }


}
