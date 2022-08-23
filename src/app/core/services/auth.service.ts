import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

import { Injectable } from '@angular/core';
import { LoginData } from '../interfaces/login-data.interface';
import { user } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afauth: AngularFireAuth) { }

  async login( {email, password} : LoginData){
    try {
      return await this.afauth.signInWithEmailAndPassword(email,password);
    } catch (error) {
      console.log("Error en Login", error);
      return null;
    }
  }

  async register( {email, password} : LoginData){
    //try {
      return await this.afauth.createUserWithEmailAndPassword(email,password).then((user) => {
        console.log(user);
      })
  /*
    } catch (error) {
      console.log("Error en registro ", error);
      this.fireBaseError(error.code);
      return null;
    }*/
  }

  async loginWithGoogle() {
    try {
      return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (error) {
      console.log("Error en Login con google ", error);
      return null;
    }
    
  }

  getUserLogged(){
    return this.afauth.authState;
  }

  userIsLogged(){
    this.afauth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('user is logged in');
      } else {
        console.log('user not logged in');
      }
    });
  }

  logOut(){
    this.afauth.signOut();
  }

  fireBaseError(code: string){
    switch(code){
      case 'auth/email-already-in-use':
        return 'El correo utilizado ya esta registrado.'
      default:
        return 'Error Desconocido'
    }
  }


}
