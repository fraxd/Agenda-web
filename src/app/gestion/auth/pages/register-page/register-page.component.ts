import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginData } from 'src/app/core/interfaces/login-data.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  registerForm!: FormGroup;

  usuario!: LoginData;

  constructor(private readonly fb: FormBuilder, private authService:AuthService, private readonly router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.initForm();
  }
  // registro
  onSubmit(): void {
    console.log('form->', this.registerForm.value);
    const usuario = this.registerForm.value;
    this.authService.register(usuario).then(res =>{
        console.log ("se registro correctaente",res);
        this.router.navigate(['/login']);
    })

  }
  /// inicializacion del formulario
  initForm(): FormGroup{
    return this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]]
      })
  }

  // Ingreso con google 
  ingresarGoogle(){
    // return this.authService.GoogleAuth();
    this.authService.loginWithGoogle().then(res =>{
        console.log ("se inicio correctaente con google",res);
    })

  }

}
