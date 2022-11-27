import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
import { CitasPacienteComponent } from './pacientes/citas-paciente/citas-paciente.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { ProfesionalesComponent } from './profesionales/profesionales.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { VerCitasComponent } from './ver-citas/ver-citas.component';

const routes: Routes = [
  {
    path: '',
    component:NuevoUsuarioComponent,
    data: { titulo: 'Nuevo Usuario'}
  },
  {
    path: 'listUsuarios',
    component:UsuariosComponent,
    data: { titulo: 'Usuarios'}
  },
  {
    path:'listProfesionales',
    component: ProfesionalesComponent,
    data: { titulo: 'Profesionales'}
  },
  {
    path: 'verCitasProfesional',
    component: VerCitasComponent
  },
  {
    path: 'listPacientes',
    component: PacientesComponent
  },
  {
    path: 'verCitasPaciente',
    component: CitasPacienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
