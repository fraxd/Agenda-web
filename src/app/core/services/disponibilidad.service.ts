import { Injectable} from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable, observable } from 'rxjs';
import { configSession, horasSesion } from '../interfaces/config-sesion.interface';

@Injectable({
  providedIn: 'root'
})
export class DisponibilidadService {

  uid: string; 
  constructor( public afs: AngularFirestore, private firestore:Firestore ) { 
    const user = JSON.parse(localStorage.getItem('user') || (''));
    this.uid = user.uid;
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

      //console.log(sessionConfig);
      return configRef.set(sessionConfig, {
        merge: true,
      });


  }

  // Pendiente la precarga de datos
  //recibirDatosBD(): Observable<configSession[]>{
  recibirDatosBDbyUID(){
    return this.afs.collection('sessions-Config').doc(this.uid).valueChanges();
  }



}