import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { RecuperarPasswordComponent } from './pages/recuperar-password/recuperar-password.component';
import { VerificarEmailComponent } from './pages/verificar-email/verificar-email.component';


@NgModule({
  declarations: [
    LoginPageComponent,
    LoginFormComponent,
    RegisterPageComponent,
    SpinnerComponent,
    RecuperarPasswordComponent,
    VerificarEmailComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoginPageComponent,
    LoginFormComponent,
    RegisterPageComponent,
    SpinnerComponent,
    RecuperarPasswordComponent,
    VerificarEmailComponent
  ]
})
export class AuthModule { }
