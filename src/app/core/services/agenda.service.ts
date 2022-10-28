import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private afs: AngularFirestore) { }

  // pensaba solamente para uso de profesionales 
  obtenerDatos():Observable<any>{
    const user: User = JSON.parse( (localStorage.getItem('user') || ''));
    const uid: string = user.uid;
    return this.afs.collection('sessions-Config').doc(uid).valueChanges();
  }




}
