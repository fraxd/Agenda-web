import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
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
  event: any;
  eventFlag:boolean=false;
  password: string = '';
  passwordVerify: string = '';
  oldPassword:string;
  userId = JSON.parse(localStorage.getItem('user')|| '').uid;
  public file: any = {}
  constructor(private messageService: MessageService, private auth:AuthService, private afs: AngularFirestore, private storage: Storage) { }

  ngOnInit(): void {
    console.log(this.userId)

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
  };

  chooseFile(){
    console.log(this.event.target.files[0]);
    this.file = this.event.target.files[0];
    const storageRef  = ref(this.storage, `profilePics/${this.userId}`);
    const uploadTask = uploadBytesResumable (storageRef, this.file);
    uploadTask.on('state_changed',
      (snapshot)=> {
        console.log(snapshot )
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('subida va en', progress,' %');
        this.messageService.add({ severity: 'success', summary: 'Archivo Actualiado.', detail: 'Foto de perfil definida.' });
      }
    ),
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
      });
    }
  }

  saveRef(event:any){
    this.eventFlag=true;
    this.event = event;
  }
}
