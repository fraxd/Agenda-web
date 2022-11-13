import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from 'src/app/core/interfaces/User.interface';
import { UsuariosService } from 'src/app/core/services/admin/usuarios.service';
import { EditUsuarioComponent } from './edit-usuario/edit-usuario.component'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [DialogService, MessageService]
})
export class UsuariosComponent implements OnInit {

  usuarios:User[];
  loading: boolean = true;
  constructor(private usuarioService:UsuariosService, public dialogService: DialogService, private messageService: MessageService) { 
    this.usuarioService.getListUsers().subscribe( res =>{
      this.usuarios = res
      this.loading = false;
    });
  }

  ngOnInit(): void {
  }

  settingUser(usuario:any){
    const ref = this.dialogService.open(EditUsuarioComponent, {
      header: 'Editar Usuario',
      width: '70%',
      data: {
        user: usuario
      }
    });

    ref.onClose.subscribe((res: boolean) => {
      if (res) {
        this.messageService.add({ severity: 'success', summary: 'Usuario Actualizado', detail: 'Via TeleMed' });
      }

    })
  }
}


