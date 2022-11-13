import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
import { ProfesionalesComponent } from './profesionales/profesionales.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
