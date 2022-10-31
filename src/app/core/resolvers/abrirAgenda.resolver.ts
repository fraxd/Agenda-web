import {  Resolve } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { User } from "@angular/fire/auth";

@Injectable({
    providedIn: 'root'
})



export class abrirAgendaResolver implements Resolve<Observable<any>>{
    user:User = JSON.parse(localStorage.getItem('user') || (''));
    especialidad = localStorage.getItem('Especialidad') as string;
    uid = this.user.uid;
    constructor(private afs:AngularFirestore){}

    resolve(){
        return this.afs.collection(`sessions`).doc(this.especialidad).collection(this.uid).doc(`details`).get();
    }
}