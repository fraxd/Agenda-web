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

  aceptoTems: boolean = true;

  constructor(private readonly fb: FormBuilder, private authService: AuthService, private readonly router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.registerForm = this.initForm();
    this.toastr.toastrConfig.positionClass = 'toast-center-center';

  }
  // registro
  onSubmit(): void {
    let nombre:string;
    if(this.registerForm.valid){
      nombre = this.registerForm.value.nombre;
      const email = this.registerForm.value.email;
      const password = this.registerForm.value.password;
      const confirmPassword = this.registerForm.value.confirmPassword;
      this.usuario = { email, password };
      if (password !== confirmPassword) {
        this.toastr.error('Las contraseñas ingresadas deben coincidir', 'Error');
        return;
      }

      
      
      this.authService.register(this.usuario, nombre).then(res => {
        this.router.navigate(['/login']);
        this.toastr.info('Le enviamos un correo para verificar su correo', 'Verificar Correo');
      }).catch((error) => {
        this.toastr.error(this.authService.fireBaseError(error.code), 'Error');
        
      })
    } else this.toastr.error('Debes completar el formulario correctamente.', 'Error');

  }
  /// inicializacion del formulario
  initForm(): FormGroup {
    return this.fb.group({

      nombre: ['', [Validators.required]],
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

  checkbox(){
    if(this.aceptoTems) this.aceptoTems = false;
    else this.aceptoTems = true;
  }

}
