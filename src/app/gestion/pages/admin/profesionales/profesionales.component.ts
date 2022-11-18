import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from 'src/app/core/interfaces/User.interface';
import { UsuariosService } from 'src/app/core/services/admin/usuarios.service';
import { AbrirAgendaComponent } from './abrir-agenda/abrir-agenda.component';

@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.css'],
  providers: [DialogService, MessageService]
})
export class ProfesionalesComponent implements OnInit {

  usuarios:User[];
  loading: boolean = true;
  constructor(private usuarioService:UsuariosService, public dialogService: DialogService, private messageService: MessageService,
    private router: Router) { 
    this.usuarioService.getListProfesionales().subscribe( res =>{
      this.usuarios = res
      this.loading = false;
    });
  }

  ngOnInit(): void {
  }

  abrirAgenda(usuario:any){
    const ref = this.dialogService.open(AbrirAgendaComponent, {
      header: 'Abrir Agenda',
      width: '80%',
      height: '80%',
      data: {
        user: usuario
      }
    });

    // ref.onClose.subscribe((res: boolean) => {
    //   if (res) {
    //     this.messageService.add({ severity: 'success', summary: 'Usuario Actualizado', detail: 'Via TeleMed' });
    //   }

    // })
  }

  verConsultas(usuario:User){
    this.router.navigate(['/dashboard/admin/verCitasProfesional'], { queryParams: { uidProfesional: usuario.uid } });
    this.messageService.add({ severity: 'info', summary: 'No implementado aun.', detail: 'Via TeleMed' });
  }
}




