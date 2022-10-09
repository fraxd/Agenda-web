import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RecuperarPasswordComponent } from './pages/recuperar-password/recuperar-password.component';
import { VerificarEmailComponent } from './pages/verificar-email/verificar-email.component';


@NgModule({
  declarations: [
    LoginPageComponent,
    LoginFormComponent,
    RegisterPageComponent,
    RecuperarPasswordComponent,
    VerificarEmailComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    LoginPageComponent,
    LoginFormComponent,
    RegisterPageComponent,
    RecuperarPasswordComponent,
    VerificarEmailComponent
  ]
})
export class AuthModule { }
