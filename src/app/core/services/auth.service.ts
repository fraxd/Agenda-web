import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

import { Injectable, NgZone } from '@angular/core';
import { LoginData } from '../interfaces/login-data.interface';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, } from '@angular/fire/compat/firestore';
import { User } from '../interfaces/User.interface'
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userData: any;

  constructor(
    public afauth: AngularFireAuth,  // inyeccion del servicio de fireAuth
    public afs: AngularFirestore,  // inyeccion de servicio de firestore 
    public router: Router,
    public ngZone: NgZone,
    private toastr: ToastrService
  ) {
    // Almecena en el local storage la informacion del usuario cuando inicia o cierra sesion
    this.afauth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        this.returnUserDb(user.uid).subscribe((res: any) => {
          const userRef: User = res
          localStorage.setItem('userRol', userRef.rol);
          localStorage.setItem('nombre', userRef.displayName);
          if (userRef.rol == 'profesional') localStorage.setItem('Especialidad', userRef.especialidad || 'null');
        })

        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('User')!);
      } else {
        localStorage.clear();
      }
    });
  }

  // METODO LOGIN ********
  login({ email, password }: LoginData) {
    const rol = localStorage.getItem('userRol');
    this.afauth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user?.emailVerified) {
          if (rol == 'paciente') {
            this.router.navigate(['/hubsalud']);
          } else this.router.navigate(['/dashboard']);
        } else {
          this.logOut();
          this.router.navigate(['/verificar-email']);
        }
      })
      .catch((error) => {
        this.toastr.error(this.fireBaseError(error.code), 'Error');
        return error;
      });
  }
  // Metodo Register
  async register({ email, password }: LoginData, nombre: string) {
    try {
      const result = await this.afauth.createUserWithEmailAndPassword(email, password);
      this.verifyEmail();
      this.setUserData(result.user, nombre);
      return result;
    } catch (error) {
      return error;
    }

    }
    async registerManual({ email, password }: LoginData, nombre: string, rol: string, especialidad?: string) {
      try {
        const result = await this.afauth.createUserWithEmailAndPassword(email, password);
        this.verifyEmail();
        if (especialidad) this.setUserData(result.user, nombre, rol, especialidad);
        else this.setUserData(result.user, nombre, rol);
        return result;
      } catch (error) {
        return error;
      }
    }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Ingresando datos a la DB de Firestore
  setUserData(user: any, nombre?: string, rol?: string, especialidad?: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      rol: 'paciente'
    };
    if (nombre) {
      userData.displayName = nombre;
      console.log(userData.displayName);
    }
    if (rol) userData.rol = rol;  // existen 3 roles: Admin, profesional y paciente
    if (especialidad) userData.especialidad = especialidad;
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
  verifyEmail() {
    this.afauth.currentUser.then(user => user?.sendEmailVerification());
  }

  //Cerrar sesion
  logOut() {
    this.afauth.signOut().then(() => {
      localStorage.clear();


    }).then(() => {
      this.router.navigate(['/login']);
    })

  }

  // Retorna el usuario desde firestore 
  returnUserDb(uid: string) {
    return this.afs
      .collection('users')
      .doc(uid)
      .valueChanges()
  }

  // reautentificacion para funciones de alto "riesgo"
  async reLogin(password:string):Promise<boolean>{
    await this.afauth.signInWithEmailAndPassword(this.userData.email, password).then( res =>{
      return true;
    }).catch( err =>{
      return false;
    })

    return false;

  }

  updatePassword(password: string) {
    this.afauth.currentUser.then(user => user?.updatePassword(password)).then( res =>{
      console.log(res)
      return res;
    }).catch( err =>{
      console.log(err)
      return err;
    })


  }
  fireBaseError(code: string) {

    switch (code) {
      // Correo ya existe
      case 'auth/email-already-in-use':
        return 'El correo utilizado ya esta registrado.'
      // Contrase??a Debil
      case 'auth/weak-password':
        return 'La contrase??a definida es muy debil.'
      // Correo Invalido
      case 'auth/invalid-email':
        return 'El correo no esta en el formato correcto'
      // Contrase??a incorrecta
      case 'auth/wrong-password':
        return 'La Contrase??a no es valida.'
      // Usuario no existe
      case 'auth/user-not-found':
        return 'El usuario no existe.'
      default:
        return 'Error Desconocido'
    }
  }




}
