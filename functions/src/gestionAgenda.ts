import { configSession, horasSesion } from "./interfaces/config-session.interface";
import { session } from "./interfaces/session.interface";
import { v4 as uuidv4 } from 'uuid';
import * as admin from 'firebase-admin';



interface Time {
    hours: number,
    minutes: number
}

interface Details {
  fecha: Date
}


export class gestionAgenda {

  nombreProfesional: string = '';
  especialidad: string = '';
  uid: string = '';
  db!: admin.firestore.Firestore;

  public abrirAgenda(dbtemp:admin.firestore.Firestore,config:configSession, fechaInicio: Date, fechanFin:Date, profesional: string, esp: string, uid:string){
      this.nombreProfesional = profesional;
      this.especialidad = esp;
      this.uid = uid;
      this.db = dbtemp;
      
      //Codigo bastante poco eficiente, evaluar mejorarlo
      if(config.lunes.activo){
          this.generarAgenda(config.lunes,1,config.duracion,fechaInicio,fechanFin);
      }
      if(config.martes.activo){
        this.generarAgenda(config.martes,2,config.duracion,fechaInicio,fechanFin);
      }
      if(config.miercoles.activo){
        this.generarAgenda(config.miercoles,3,config.duracion,fechaInicio,fechanFin);
      }
      if(config.jueves.activo){
          this.generarAgenda(config.jueves,4,config.duracion,fechaInicio,fechanFin);
      }
      if(config.viernes.activo){
          this.generarAgenda(config.viernes,5,config.duracion,fechaInicio,fechanFin);
      }
    console.log('Its done')
  }

    generarAgenda(sessionConfig: horasSesion, dia: number, duracion: number, fechaInicio:Date, fechaFin:Date){
        let sessiones: session[] = [];
        let flag: boolean = true;
        let fecha: Date = new Date(fechaInicio); // basicamente creo una copia 
        let difDay: number;
        let timeCurrent: Time;
        let timeCurrentEnd:Time;
        let dateTemp: Date;
        let fechaTemp: Date = new Date(sessionConfig.horaFin);
        difDay = fecha.getDay() - dia; // lunes =1, martes = 2, miercoles = 3
        dateTemp = new Date(sessionConfig.horaInicio);
        if(difDay < 0)fecha.setDate(fecha.getDate() - difDay); // ajuste de fecha al dia de la sesion
        if(difDay > 0) fecha.setDate(fecha.getDate() + (difDay+5)) ;
        for (let i=0; i<5;i++) {   
            timeCurrent = {hours: dateTemp.getHours(), minutes: dateTemp.getMinutes()};
            timeCurrentEnd = timeCurrent;
            while(flag){
              
            timeCurrentEnd = this.timeAddition(timeCurrentEnd,duracion);
   
            sessiones.push({  // Tal vez agregarle algo mas
              nombreProfesional: this.nombreProfesional ,
              uid: this.uid,
              especialidad: this.especialidad, // FALTA FUNCION QUE LA TRAIGA 
              disponible: true,
              id: uuidv4(),
              title: 'Consulta',
              start: this.timeGenerator(fecha,timeCurrent),
              end: this.timeGenerator(fecha,timeCurrentEnd),
              color: 'green'
              });
            if(timeCurrentEnd.hours>fechaTemp.getHours()) flag= false;
            else if(timeCurrentEnd.hours==fechaTemp.getHours() && 
                    timeCurrentEnd.minutes >= fechaTemp.getMinutes()) flag = false;
    
            timeCurrent = timeCurrentEnd;
       
          }
          
          fecha.setDate(fecha.getDate()+7);
          flag = true;
          if(fecha>fechaFin){
            i=10; // Si la nueva fecha supera el tope, pa fuera altoke.
          } 
    
        }
    
        this.subirBD(sessiones,fechaFin,dia);  // se envia dia para saber cuando se envia el contenido
    
      }
    
      timeGenerator(fecha: Date, time:Time){ //Genera el string con la fecha y la hora;
        let fechaString:string = fecha.toISOString();
        let fechaTemp:string[] = fechaString.split('T',1);
        let fechaNueva: string;
        if(time.hours<10){
            let cero: string =  String(time.hours).padStart(2, '0');
            fechaNueva = fechaTemp[0].concat('T',cero);
        }
        else{
            fechaNueva= fechaTemp[0].concat('T',time.hours.toString());
        }
        if(time.minutes<10){
            let cero: string =  String(time.minutes).padStart(2, '0');
            fechaNueva = fechaNueva.concat(':',cero);
        }
        else{
            fechaNueva = fechaNueva.concat(':',time.minutes.toString());
        }
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
    subirBD(sessiones :session[],fechaFin:Date,dia:number){
        const colRef =  this.db.collection(`sessions/${this.especialidad}/${this.uid}`);
        sessiones.forEach(function (sesion){
          let sessionRef = colRef.doc(sesion.id);
          sessionRef.create(sesion).catch(err =>{
            console.log(err);
          })
            // colRef.add(sesion).catch( err =>{
            //   console.log(err)
            // }) 
        }); 

        let fechaDB:Details = {
          fecha: fechaFin
        }  
        let docRef = colRef.doc(`details`);
        docRef.set(fechaDB,{
          merge: true,
        });
    }
}
