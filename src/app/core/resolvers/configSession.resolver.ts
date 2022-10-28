import {  Resolve } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "@angular/fire/auth";
import { configSession } from "../interfaces/config-sesion.interface";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";


@Injectable({
    providedIn: 'root'
})
// esto se debe adaptar a PACIENTES!!!!!
// valido solo para profesionales
export class configSessionResolver implements Resolve<Observable<any>>{ // cambiar a configSession 

    user: User = JSON.parse( (localStorage.getItem('user') || ''));
    uid: string = this.user.uid;
    diasArray: any[];
    especialidad: string = 'Medicina General'; // ADAPTAR PARA USO GENERAL

    constructor( private afs:AngularFirestore){}

    resolve(){  
        const config: Observable<any> = this.obtenerDatos();
        const events: Observable<any> = this.afs.collection(`sessions/${this.especialidad}/${this.uid}`).valueChanges();  
            this.obtenerDatos().subscribe( res=>{
                this.diasArray = this.getDiasArray(res) as any[ ];
                this.diasAtencion();
                localStorage.setItem("Dias", JSON.stringify(this.diasArray));
            });
      
        let dual: any = {config , events}
        return dual
            

    }
    // Funcion que recorre la configuracion y genera un array con todas las sesiones del profesional.
    getDiasArray(config :configSession){
      
        const dias: any[] = [];
        
        if(config.lunes.activo){  
            dias.push({
                daysOfWeek: [ 1 ], // Lunes
                startTime: this.timeFormater(config.lunes.horaInicio), // 8am
                endTime: this.timeFormater(config.lunes.horaFin) // 6pm
            },)
        }
        if(config.martes.activo){
            dias.push({
                daysOfWeek: [ 2 ], // martes
                startTime: this.timeFormater(config.martes.horaInicio), // 8am
                endTime: this.timeFormater(config.martes.horaFin) // 6pm
            },)
        }
        if(config.miercoles.activo){
            dias.push({
                daysOfWeek: [ 3 ], // miercoles
                startTime: this.timeFormater(config.miercoles.horaInicio), 
                endTime: this.timeFormater(config.miercoles.horaFin)
            },)
        }
        if(config.jueves.activo){
            dias.push({
                daysOfWeek: [ 4 ], // jueves
                startTime: this.timeFormater(config.jueves.horaInicio), // 8am
                endTime: this.timeFormater(config.jueves.horaFin) // 6pm
            },)
        }
        if(config.viernes.activo){
            dias.push({
                daysOfWeek: [ 5 ], // viernes
                startTime: this.timeFormater(config.viernes.horaInicio), // 8am
                endTime: this.timeFormater(config.viernes.horaFin) // 6pm
            },)
        }
        return dias;
    }
    // Convierte de formate Date a formato Time
    timeFormater(fecha:Date){
        fecha = new Date(fecha);
        let hora = fecha.getHours() ;
        let horaString = hora.toString();
        let minutos = fecha.getMinutes();
        let minutosString = minutos.toString();
        let final = horaString.concat(':',minutosString);
        return final;
    }
    // funcion que genera un array en el localStorage con los dias que atiende el profesional
    diasAtencion(){
        let atencionDias: any[] = [0, 1 , 2  , 3 , 4, 5, 6] //Parte 1 como lunes y 0 domingo 
        this.diasArray.forEach(function (dias){
            atencionDias = atencionDias.filter( e => e != dias.daysOfWeek)
        });
        localStorage.setItem("NoAtencion", JSON.stringify(atencionDias));

    }
    //Funcion que carga los eventos del profesional
    loadEvents():Observable<any>{
        return this.afs.collection(`sessions/${this.especialidad}/${this.uid}`).valueChanges();  
    }

    obtenerDatos():Observable<any>{
        const user: User = JSON.parse( (localStorage.getItem('user') || ''));
        const uid: string = user.uid;
        return this.afs.collection('sessions-Config').doc(uid).valueChanges();
      }
    
}