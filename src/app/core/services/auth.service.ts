import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

import { Injectable, NgZone } from '@angular/core';
import { LoginData } from '../interfaces/login-data.interface';
import { Router } from '@angular/router';
import {AngularFirestore,AngularFirestoreDocument,} from '@angular/fire/compat/firestore';
import {User} from '../interfaces/User.interface'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userData: any;

  constructor(
    public afauth: AngularFireAuth,  // inyeccion del servicio de fireAuth
    public afs: AngularFirestore,  // inyeccion de servicio de firestore 
    public router: Router,
    public ngZone: NgZone
    ) { 
      // Almecena en el local storage la informacion del usuario cuando inicia o cierra sesion
      this.afauth.authState.subscribe( (user) =>{
        if(user){
          this.userData = user;
          localStorage.setItem('user',JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('User')!);
        } else{
          localStorage.setItem('user','null');
          JSON.parse(localStorage.getItem('user')!);
        }
      });
    }

  // METODO ORIGINAL
  // async login({ email, password }: LoginData) {
    //   return await this.afauth.signInWithEmailAndPassword(email, password);
    // }
    
    // async register({ email, password }: LoginData) {
    //   return await this.afauth.createUserWithEmailAndPassword(email, password).then((user) => {
    //     console.log(user);
    //   })
  
    // }
    // METODO LOGIN DE PRUEBA ********
    login({email,password}:LoginData) {
      return this.afauth.signInWithEmailAndPassword(email,password)
                  .then( (result) =>{
                    this.setUserData(result.user);
                    return result;
                  })
                  .catch( (error) =>{
                    return error;
                  });
    }
    // Metodo Register prueba
    register({email,password}: LoginData, nombre:string){ 
      return this.afauth.createUserWithEmailAndPassword(email,password)
                  .then( (result) =>{
                    this.verifyEmail();
                    this.setUserData(result.user,nombre);
                    return result;
                  })
                  .catch( (error)=>{
                    return error;
                  })

    }
      // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

    // Ingresando datos a la DB de Firestore
    setUserData(user: any, nombre?: string){
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(
        `users/${user.uid}`
        );
        const userData: User = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
        };
        if(nombre){
          userData.displayName = nombre;
          console.log(userData.displayName);
        } 
      return userRef.set(userData, {
        merge: true,
      });
    }


  //Inicio con google
  async loginWithGoogle() {
    try {
      return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (error) {
      console.log("Error en Login con google ", error);
      return null;
    }

  }
  // Retorna Usuario
  getUserLogged() {
    return this.afauth.authState;
  }
  //Envio correo para verificacion de usuario
  verifyEmail(){
    this.afauth.currentUser.then(user => user?.sendEmailVerification());
  }

  //Cerrar sesion
  logOut() {
    this.afauth.signOut().then(() =>{
      localStorage.removeItem('User');
    });
  }

  fireBaseError(code: string) {

    switch (code) {
      // Correo ya existe
      case 'auth/email-already-in-use':
        return 'El correo utilizado ya esta registrado.'
      // Contraseña Debil
      case 'auth/weak-password':
        return 'La contraseña definida es muy debil.'
      // Correo Invalido
      case 'auth/invalid-email':
        return 'El correo no esta en el formato correcto'
      // Contraseña incorrecta
      case 'auth/wrong-password':
        return 'La Contraseña no es valida.'
      // Usuario no existe
      case 'auth/user-not-found':
        return 'El usuario no existe.'
      default:
        return 'Error Desconocido'
    }
  }




}
