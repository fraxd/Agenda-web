import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginData } from 'src/app/core/interfaces/login-data.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  registerForm!: FormGroup;

  usuario!: LoginData;

  loading: boolean = false;

  constructor(private readonly fb: FormBuilder, private authService: AuthService, private readonly router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.registerForm = this.initForm();
    this.toastr.toastrConfig.positionClass = 'toast-center-center';

  }
  // registro
  onSubmit(): void {
    //console.log('form->', this.registerForm.value);
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const confirmPassword = this.registerForm.value.confirmPassword;
    this.usuario = { email, password };

    if (password !== confirmPassword) {
      this.toastr.error('Las contraseñas ingresadas deben coincidir', 'Error');
      return;
    }

    this.loading = true;

    this.authService.register(this.usuario).then(res => {
      //console.log("se registro correctaente", res);
      this.loading = false;
      this.router.navigate(['/login']);
      this.authService.verifyEmail();
      //this.toastr.success('El usuario fue registrado exitosamente', 'Usuario registrado');
      this.toastr.info('Le enviamos un correo para verificar su correo', 'Verificar Correo');
    }).catch((error) => {
      //console.log(error);
      this.loading = false;
      this.toastr.error(this.authService.fireBaseError(error.code), 'Error');

    })

  }
  /// inicializacion del formulario
  initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]

    })
  }

  // Ingreso con google 
  ingresarGoogle() {
    // return this.authService.GoogleAuth();
    this.authService.loginWithGoogle().then(res => {
      console.log("se inicio correctaente con google", res);
    })

  }

}
