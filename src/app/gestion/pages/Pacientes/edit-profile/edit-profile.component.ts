import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers: [MessageService]
})
export class EditProfileComponent implements OnInit {

  reLogeo: boolean = false;
  password: string = '';
  passwordVerify: string = '';
  oldPassword:string;
  constructor(private messageService: MessageService, private auth:AuthService) { }

  ngOnInit(): void {
  }

  // Por motivos de seguridad no se puede cambiar el email
  // adicionalmente se debe reautenticar el usuario para poder cambiar la contraseña
  // por lo que se debe pedir la contraseña actual para poder cambiarla
  // No contara con foto de perfil el paciente debido a la poca utilidad real que tiene
  submit() {
    if (this.verifyPassword()) {
      this.auth.updatePassword(this.password);
      console.log('Enviar formulario');
    } else {
      console.log('Las contraseñas no coinciden');
    }

  }

  verifyPassword() {
    if (this.password.length == 0 || this.passwordVerify.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Debes ingresar la contraseña en ambos campos.', detail: 'Recuerda llenar todo los campos' });
      return false;
    }
    if (this.password.length < 8 || this.passwordVerify.length < 8) {
      this.messageService.add({ severity: 'error', summary: 'No cumple el minimo de largo la contraseña.', detail: 'Debe ser de minimo 8 caracteres.' });
      return false;
    }

    if (this.password == this.passwordVerify) {
      // toas sobre contraseñas iguales y cambio ejecutado
      console.log(' es igual');
      return true;
    } else {
      this.messageService.add({ severity: 'error', summary: 'Debes ingresar la misma contraseña en ambos campos.', detail: 'Verifica que este bien escrita.' });
      return false
    }
  }

  async oldPasswordVerify(){
    await this.auth.reLogin(this.oldPassword).then( ()=>{
      this.reLogeo = true;
      this.messageService.add({ severity: 'success', summary: 'Contraseña correcta.', detail: 'Login Reautentificado.' });
    }).catch( ()=>{
      this.messageService.add({ severity: 'error', summary: 'Contraseña incorrecta.', detail: 'Verifica que este bien escrita.' });
    });
  }
}
