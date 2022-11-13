import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/core/services/admin/usuarios.service';

interface rolInterface{
  name: string
}
@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {

  nombre:string; // Nombre del nuevo usuario
  email:string;   //Correo electronico
  rolSelected:rolInterface = {name: ''}; // Rol elegido.
  especialidades: any[]; // Array de especialidades
  especialidadSelected: any;
  password: string = '';

  roles: rolInterface[] = [];   // Array de roles para el form
  constructor(private usuarioService:UsuariosService) {
    this.generatePassword()
    this.roles = [
      { name: 'admin'},
      { name: 'profesional'},
      { name: 'paciente'}
    ];
   }

  ngOnInit(): void {
    this.usuarioService.getEspecialidades().subscribe( (res:any) =>{
      this.especialidades = res;
    })
  }

  rolChange(){
    console.log(this.rolSelected.name)
  }

  generatePassword() {
    this.password = Math.random().toString(36).slice(-8);
  }

  

  submit(){
    if(this.especialidadSelected.especialidad) this.usuarioService.newUser(this.nombre,this.email,this.rolSelected.name,this.password, this.especialidadSelected.especialidad);
    else this.usuarioService.newUser(this.nombre,this.email,this.rolSelected.name,this.password);
    console.log(this.nombre, this.email, this.especialidadSelected.especialidad,this.password);
  }

  /// FALTA LA PARTE DE CREAR LOS USUARIOS 
  // la idea es tal vez dejar almacenados los datos de acceso en la bd FORMA TEMPORAL para tener los datos 
  // para las pruebas
  // seguidamente una vez creado varios perfiles, generar la disponibilidad de horaria de 1-2-3 por cada 
  // profesioanl
  
  
}
