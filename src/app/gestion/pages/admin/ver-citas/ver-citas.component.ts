import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { sesionReserva } from 'src/app/core/interfaces/sesion-reserva.interface';
import { UsuariosService } from 'src/app/core/services/admin/usuarios.service';

@Component({
  selector: 'app-ver-citas',
  templateUrl: './ver-citas.component.html',
  styleUrls: ['./ver-citas.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class VerCitasComponent implements OnInit {

  loading: boolean = true;
  col: any[];
  display:boolean = false;
  uidProfesional:string;
  sesiones: sesionReserva[] = [];
  constructor(private usuarioService :UsuariosService , private confirmationService:ConfirmationService, 
              private messageService: MessageService,  private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.uidProfesional = params['uidProfesional'];
    })

    this.col =[
      {field: 'especialidad', header: 'Especialidad'},
      {field: 'nombreProfesional', header: 'Profesional'},
      {field: 'timeStart', header: 'fecha'},

    ]
    this.usuarioService.getSesiones(this.uidProfesional).subscribe((data:sesionReserva[])=>{
      this.sesiones = data;
      this.loading = false;
    });
  }

  navigate(url:string){
    if(url)window.open(url, "_blank");
  }


  anular(sesion:sesionReserva){
    this.confirmationService.confirm({
      message: '¿Esta seguro de llevar a cabo esto? No se puede revertir.',
      accept: () => {
        this.usuarioService.anularSesion(sesion.uidReserva, sesion.uidProfesional, sesion.especialidad, sesion.uidEvento).subscribe( ()=>{
          this.messageService.add({severity:'success', summary:'Se anulo la cita ya.', detail:'En 72 horas se efectura el reembolso.'});
        });
      },
      reject: () => {
        this.messageService.add({severity:'info', summary:'Cancelado', detail:'No se anulo la cita.'});
      },
      acceptLabel: 'Estoy Segurisimo.'
  });

  }
}
