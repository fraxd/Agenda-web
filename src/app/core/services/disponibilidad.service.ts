import { Time } from '@angular/common';
import { Injectable} from '@angular/core';
import { User } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { configSession, horasSesion } from '../interfaces/config-sesion.interface';
import { session } from '../interfaces/sesion.interface';

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
  


  constructor( public afs: AngularFirestore ) { 
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

  recibirDatosBDbyUID(){
    return this.afs.collection('sessions-Config').doc(this.uid).valueChanges();
  }

  abrirAgenda(fecha?: Date[]){  // date opcional por el moento 
    const configRef = this.afs.doc(`sessions-Config/${this.uid}`).get();

    let config: configSession;
    configRef.subscribe( res =>{
      config = res.data() as configSession;
      console.log(config)
    });
    
    
    
  }

  generarAgenda(sessionConfig: horasSesion, dia: number, duracion: number){
    let sessiones: session[] = [];
    let flag: boolean = true;
    let fecha: Date = new Date();
    let difDay: number;
    let timeCurrent: Time;
    let timeCurrentEnd:Time;
    let dateTemp: Date;
    let fechaTemp: Date = new Date(sessionConfig.horaFin);
    difDay = fecha.getDay() - dia; // lunes =1, martes = 2, miercoles = 3
    dateTemp = new Date(sessionConfig.horaInicio);
    timeCurrent = {hours: dateTemp.getHours(), minutes: dateTemp.getMinutes()};
    timeCurrentEnd = timeCurrent;

    if(difDay < 0)fecha.setDate(fecha.getDate() - difDay); // ajuste de fecha al dia de la sesion
    if(difDay > 0) fecha.setDate(fecha.getDate() + (difDay+5)) ;

    for (let i=0; i<4;i++) {     /// i= 1 solo para pruebas
      while(flag){
        timeCurrentEnd = this.timeAddition(timeCurrentEnd,duracion);
        sessiones.push({  // Tal vez agregarle algo mas
          nombreProfesional: this.nombreProfesional ,
          uid: this.uid,
          especialidad: this.especialidad, // FALTA FUNCION QUE LA TRAIGA 
          disponible: true,
          id: Math.random() as unknown as string, // Falta implementar generador de UID
          title: 'Consulta',
          start: this.timeGenerator(fecha,timeCurrent),
          end: this.timeGenerator(fecha,timeCurrentEnd),
          });
        if(timeCurrentEnd.hours>fechaTemp.getHours()) flag= false;
        else if(timeCurrentEnd.hours==fechaTemp.getHours() && 
                timeCurrentEnd.minutes >= fechaTemp.getMinutes()) flag = false;

        timeCurrent = timeCurrentEnd;
   
      }
      
      fecha.setDate(fecha.getDate()+7);

    }

    this.subirBD(sessiones);

  }

  timeGenerator(fecha: Date, time:Time){ //Genera el string con la fecha y la hora;
    let fechaString:string = fecha.toISOString();
    let fechaTemp:string[] = fechaString.split('T',1);
    let fechaNueva: string;
    if(time.minutes<10){
      let cero: string =  String(time.minutes).padStart(2, '0');
      fechaNueva = fechaTemp[0].concat('T',cero);
    }
    else{
      fechaNueva= fechaTemp[0].concat('T',time.hours.toString());
    }
    fechaNueva = fechaNueva.concat(':',time.minutes.toString());
    fechaNueva = fechaNueva.concat(':','00');
    return fechaNueva;
  }

  // Retorna el tiempo sumado a la duracion de la sesion
  timeAddition(timeCurrent: Time, duracion: any): Time{
    let duracionNumber: number = parseInt(duracion);
    let newMinutes: number = timeCurrent.minutes + duracionNumber as number;
    let newHours: number = timeCurrent.hours as number;
    if(newMinutes>=60){
      newMinutes = newMinutes -60;
      newHours++;
    };
    let newTime: Time = {
      hours: newHours,
      minutes: newMinutes
    }
    return newTime as Time;

  }

// Sube el array de sesiones a la Bd
subirBD(sessiones :session[]){

  const sessionRef: AngularFirestoreCollection<any> = this.afs.collection(`sessions/${this.especialidad}/${this.uid}`);
  sessiones.forEach(function (sesion) {
    sessionRef.add(sesion).catch( err => console.log(err));
  } )

  
}


  lastDayOpen(){
  let fecha: Date = new Date(500000);
  let info: any;

  return this.afs.collection(`sessions`).doc(this.especialidad).collection(this.uid).doc(`details`).get();
  }
}
   
