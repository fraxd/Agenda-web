import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { User } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { environment } from '../../../environments/environment';
import { configSession, horasSesion } from '../interfaces/config-sesion.interface';

interface detalles {
  fecha: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DisponibilidadService {

  uid: string; 
  nombreProfesional: string;
  especialidad: string = 'Medicina General'; // IMPLEMENTAR FUNCION QUE BUSQUE ESTO
  


  constructor( public afs: AngularFirestore, private http:HttpClient ) { 
    const user:User = JSON.parse(localStorage.getItem('user') || (''));
    this.especialidad = localStorage.getItem('Especialidad') as string;
    this.uid = user.uid;
    this.nombreProfesional = localStorage.getItem('nombre') as string;
  }

  actualiarDatosBD(diasSelected: string[], horaInicio: Date[], horaFin: Date[], duracionTemp: number, valorTemp:number){

    const configRef: AngularFirestoreDocument<any> = this.afs.doc(
      `sessions-Config/${this.uid}`
      );
    
      const lunesTemp: horasSesion = {
        activo: false,
        horaInicio: new Date(500000000000),
        horaFin: new Date(500000000000),
      }
      const martesTemp: horasSesion = {
        activo: false,
        horaInicio: new Date(500000000000),
        horaFin: new Date(500000000000),
      }
      const miercolesTemp: horasSesion = {
        activo: false,
        horaInicio: new Date(500000000000),
        horaFin: new Date(500000000000),
      }
      const juevesTemp: horasSesion = {
        activo: false,
        horaInicio: new Date(500000000000),
        horaFin: new Date(500000000000),
      }
      const viernesTemp: horasSesion = {
        activo: false,
        horaInicio: new Date(500000000000),
        horaFin: new Date(500000000000),
      }

    for( let i=0; i<diasSelected.length; i++){
      switch(diasSelected[i]){
        case 'Lunes':
          lunesTemp.activo = true;
          lunesTemp.horaInicio = horaInicio[i];
          lunesTemp.horaFin = horaFin[i]
          break;
        case 'Martes':
          martesTemp.activo = true;
          martesTemp.horaInicio = horaInicio[i];
          martesTemp.horaFin = horaFin[i];
          break;
        case 'Miercoles':
          miercolesTemp.activo = true;
          miercolesTemp.horaInicio = horaInicio[i];
          miercolesTemp.horaFin = horaFin[i];
          break;
        case 'Jueves':
          juevesTemp.activo = true;
          juevesTemp.horaInicio = horaInicio[i];
          juevesTemp.horaFin = horaFin[i];
          break;
        case 'Viernes':
          viernesTemp.activo = true;
          viernesTemp.horaInicio = horaInicio[i];
          viernesTemp.horaFin = horaFin[i];
          break;
        default:
          console.log('Algo paso, que? nose')
          break;
      }
    }
    
    const sessionConfig: configSession = {
      lunes: lunesTemp,
      martes: martesTemp,
      miercoles: miercolesTemp,
      jueves: juevesTemp,
      viernes: viernesTemp,
      duracion: duracionTemp as number,
      valor: valorTemp
      }

      return configRef.set(sessionConfig, {
        merge: true,
      });

      


  }
  // Envia los datos si es que existen de la agenda.-
  recibirDatosBDbyUID(){
    return this.afs.collection('sessions-Config').doc(this.uid).valueChanges();
  }
  //LLama una funcion post del backend el cual "abre la agenda", es decir registra en la Bd todos los dias que
  // atendera el profesional
   abrirAgenda(fecha: Date[]){
    return this.http.post(`${ environment.urlBackEnd }/api/abrirAgenda?uid=${this.uid}&profesional=${this.nombreProfesional}&especialidad=${this.especialidad}`,{fecha});
  }



  lastDayOpen(){
  return this.afs.collection(`sessions`).doc(this.especialidad).collection(this.uid).doc(`details`).get();
  }
}
   
