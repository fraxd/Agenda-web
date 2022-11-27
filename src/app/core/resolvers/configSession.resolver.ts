import {  Resolve } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "@angular/fire/auth";
import { configSession } from "../interfaces/config-sesion.interface";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
// esto se debe adaptar a PACIENTES!!!!!
// valido solo para profesionales
export class configSessionResolver implements Resolve<Observable<any>>{ // cambiar a configSession 

    user: User = JSON.parse( (localStorage.getItem('user') || ''));
    uid: string = this.user.uid;
    diasArray: any[];
    especialidad: string = localStorage.getItem('Especialidad') || '';

    constructor( private afs:AngularFirestore, private http:HttpClient){}

    resolve(){ 
        const events = this.http.get(`${ environment.urlBackEnd }/api/getAgenda?uid=${this.uid}&especialidad=${this.especialidad}`)
        const config: Observable<any> = this.obtenerDatos();   
        let dual: any = {config , events}
        return dual
            

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