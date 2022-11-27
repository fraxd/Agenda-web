import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/User.interface';
import { UsuariosService } from 'src/app/core/services/admin/usuarios.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  usuarios:User[];
  loading: boolean = true;
  constructor(private usuarioService:UsuariosService, private router: Router) { 
    this.usuarioService.getListPacientes().subscribe( res =>{
      this.usuarios = res
      this.loading = false;
    });
  }

  ngOnInit(): void {
  }

  verConsultas(usuario:User){
    this.router.navigate(['/dashboard/admin/verCitasPaciente'], { queryParams: { uidPaciente: usuario.uid, nombrePaciente:usuario.displayName } });
  }

}
