import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { environment } from '../../../../environments/environment';
import { sesionReserva } from '../../interfaces/sesion-reserva.interface';
import { User } from '../../interfaces/User.interface';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  // Este servicio esta enfocado al trabajo relacionado entre la administracion del sistema y 
  // los usuarios 

  constructor(private http:HttpClient, private authService: AuthService, private afs:AngularFirestore) { }

  getEspecialidades() {
    return this.http.get(`${ environment.urlBackEnd}/api/especialidades`);
  }
  
  newUser(nombre:string, email:string, rol:string, password:string, especialidad?:string) {
    this.authService.registerManual({email,password},nombre,rol,especialidad).then( res =>{
      console.log('registrado',res);
    }).catch( err =>{
      console.log('algo malo paso',err)
    })

  }

  getListUsers(){
    return this.http.get<User[]>(`${ environment.urlBackEnd}/api/getListUser`);
  }
  // Retorna Listado de profesionales
  getListProfesionales(){
    return this.http.get<User[]>(`${ environment.urlBackEnd}/api/getlistprofesionales`);
  }

  getListPacientes(){
    return this.http.get<User[]>(`${ environment.urlBackEnd}/api/getlistpacientes`);
  }

  updateUser(usuario:User, photoUrl:string, rol:string,  especialidad?:string, ){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${usuario.uid}`
    );
    const userData : User = {
      uid: usuario.uid,
      displayName: usuario.displayName,
      email: usuario.email,
      photoURL: photoUrl,
      emailVerified: true,
      rol: rol
    };
    if(especialidad)userData.especialidad = especialidad;

    userRef.update(userData).then( res =>{
      console.log('Agregado Correctamente')
    }).catch(err =>{
      console.log(err)
    })

  };
  // Este metodo nos indica si el profesional configuro previamente su agenda o no.
  isOpenScheduleConfig(uid:string){
    return this.http.get(`${ environment.urlBackEnd}/api/isOpenSchedule/?uid=${uid}`);
  }

  lastDayOpen(usuario:User){
    return this.afs.collection(`sessions`).doc(usuario.especialidad).collection(usuario.uid).doc(`details`).get();
  }

  abrirAgenda(usuario:User, fecha:Date[]){
    return this.http.post(`${ environment.urlBackEnd }/api/abrirAgenda?uid=${usuario.uid}&profesional=${usuario.displayName}&especialidad=${usuario.especialidad}`,{fecha});
  }

  getSesiones(uidProfesional:string){
    return this.http.get<sesionReserva[]>(`${environment.urlBackEnd}/api/getSesionesProfesionalTodas?uid=${uidProfesional}`);

  };

  getSesionesPaciente(uidPaciente:string){
    return this.http.get<sesionReserva[]>(`${environment.urlBackEnd}/api/getSesionesPacienteTodas?uid=${uidPaciente}`);

  }

  anularSesion(idReserva:string, idProfesional: string, especialidad:string, uidEvento:string){
    return this.http.post(`${environment.urlBackEnd}/api/anularSesion`, {idReserva, idProfesional, especialidad, uidEvento});
  }

}
