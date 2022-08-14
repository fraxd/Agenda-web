import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;

  usuario = {
    email: '',
    password: ''
  }
  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  onSubmit(): void {
    console.log('form->', this.loginForm.value);
  }

  initForm(): FormGroup{
    return this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]]
      })
  }

}
