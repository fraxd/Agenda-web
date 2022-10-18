import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { DiasAtencionComponent } from './dias-atencion/dias-atencion.component';
import { DisponibilidadHorariaComponent } from './disponibilidad-horaria.component';

const routes: Routes = [
  {
    path: 'dashboard/disponibilidad',
    component: DisponibilidadHorariaComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dias-atencion',
        pathMatch: 'full'
      },
      {
      path: 'dias-atencion',
      component: DiasAtencionComponent,
      },
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisponibilidadRoutingModule { }
