import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { User } from 'src/app/core/interfaces/User.interface';
import { UsuariosService } from 'src/app/core/services/admin/usuarios.service';

interface especialidad {
  activo: boolean,
  especialidad: string
}


@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css'],
  providers: [ConfirmationService]
})
export class EditUsuarioComponent implements OnInit {

  usuario: User;
  roles: any[];
  especialidades: especialidad[];
  especialidadSelected: especialidad;
  rolSelected: any;
  flagEspecialidad: boolean = false;
  flagRol: boolean = false;

  constructor(public config: DynamicDialogConfig, private usuarioService: UsuariosService, private confirmationService: ConfirmationService, public ref:DynamicDialogRef) {
    this.especialidadSelected = { activo: false, especialidad: 'null'};
    this.roles = [
      { name: 'paciente', code: 'paciente' },
      { name: 'profesional', code: 'profesional' },
      { name: 'admin', code: 'admin' }
    ];
    this.usuarioService.getEspecialidades().subscribe((res: any) => {
      this.especialidades = res;
    });
  }

  ngOnInit(): void {
    let temp = this.config.data
    this.usuario = temp['user'];

  }

  submit() {

    this.confirmationService.confirm({
      message: 'Se va a modificar el usuario,¿Estas seguro? No es reversible. ',
      accept: () => {
        this.updateData();
        this.ref.close(true);
        // SOLO SE MODIFICA LO QUE PUEDO MODIFICAR YO
        // Aspectos como correo, nombre de usuario.
      }
    });
  }

  especialidadChange(event: any){
    if(event.especialidad != this.usuario.especialidad) this.flagEspecialidad = true;
  };

  rolChange(event: any){
    if(event.name != this.usuario.rol) this.flagRol = true;
  }
  updateData(){
    if(this.flagEspecialidad && this.flagRol){
      this.usuarioService.updateUser(this.usuario,this.usuario.photoURL, this.rolSelected.name,this.especialidadSelected.especialidad );
      return 
    }
    if(this.flagEspecialidad){
      this.usuario.especialidad = this.especialidadSelected.especialidad;
      this.usuarioService.updateUser(this.usuario, this.usuario.photoURL, this.usuario.rol, this.especialidadSelected.especialidad);
      return 
    }
    if(this.flagRol){
      this.usuario.rol = this.rolSelected.name
      this.usuarioService.updateUser(this.usuario,this.usuario.photoURL, this.rolSelected.name );
      return
    }
    this.usuarioService.updateUser(this.usuario, this.usuario.photoURL, this.usuario.rol );

  }

}
