import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  loading: boolean = false;

  constructor(private readonly fb: FormBuilder, private authService: AuthService, private readonly router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.initForm();
    this.authService.userIsLogged();
  }
  // Login
  onSubmit(): void {
    //console.log('form->', this.loginForm.value);
    const usuario = this.loginForm.value;
    this.loading = true;
    this.authService.login(usuario).then(res => {
      console.log("se registro correctaente", res);
      this.router.navigate(['/dashboard']);
    }).catch((error)=> {
      this.loading = false;
    })

  }
  /// inicializacion del formulario
  initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  // Ingreso con google 
  ingresarGoogle() {
    // return this.authService.GoogleAuth();
    this.authService.loginWithGoogle().then(res => {
      console.log("se inicio correctaente con google", res);
      this.router.navigate(['/dashboard']);

    })

  }

}
