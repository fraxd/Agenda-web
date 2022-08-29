import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {

  recuperarUsuario: FormGroup;
  loading: boolean = false;

  constructor(private readonly fb: FormBuilder, private authService: AuthService, private readonly router: Router, private toastr: ToastrService, private afAuth: AngularFireAuth) {

    this.recuperarUsuario =this.fb.group({
      email: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  onSubmit(){
    const email = this.recuperarUsuario.value.email;
    this.loading = true;
    this.afAuth.sendPasswordResetEmail(email).then(() => {
      this.toastr.info('¡Te hemos enviado un correo!','Recuperar Contraseña')
      this.router.navigate(['/login']);
    }).catch((error) =>{
      this.loading = false;
      this.toastr.error(this.authService.fireBaseError(error.code), 'Error');
    })
  }

}
