import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginData } from 'src/app/core/interfaces/login-data.interface';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;

  usuario!: LoginData;

  constructor(private readonly fb: FormBuilder, private authService:AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }
  // Login
  onSubmit(): void {
    console.log('form->', this.loginForm.value);
    const usuario = this.loginForm.value;
    this.authService.login(usuario).then(res =>{
        console.log ("se registro correctaente",res);
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
