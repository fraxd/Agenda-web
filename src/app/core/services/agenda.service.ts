import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, timeout } from 'rxjs';
import { User } from '../interfaces/User.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private afs: AngularFirestore, private http:HttpClient) { }

  // pensaba solamente para uso de profesionales 
  obtenerDatos():Observable<any>{
    const user: User = JSON.parse( (localStorage.getItem('user') || ''));
    const uid: string = user.uid;
    
    return this.afs.collection('sessions-Config').doc(uid).valueChanges();
  }

  actulizarDatosSesion(id:string, disponibilidad:boolean){
    const user: User = JSON.parse( (localStorage.getItem('user') || ''));
    const uid: string = user.uid;
    const especialidad:string = localStorage.getItem('Especialidad') as string;
    let color: string;
    if(disponibilidad) color = 'green'
    else color = 'red'
    let docRef = this.afs.doc(`sessions/${especialidad}/${uid}/${id}`);
    docRef.update({
      disponible: disponibilidad,
      color: color
    });
  }

  getNombrePaciente(pacienteUid:string){
   
    return this.http.get(`${ environment.urlBackEnd}/api/getUsuario?uid=${pacienteUid}`);
    
  }

  anularSesion(idEvento: string, pacienteId: string, especialidad:string, idProfesional:string){
    console.log(pacienteId)
    return this.http.post(`${ environment.urlBackEnd}/api/anularSesionProfesional`, {idEvento, pacienteId, especialidad, idProfesional});
  }






}
