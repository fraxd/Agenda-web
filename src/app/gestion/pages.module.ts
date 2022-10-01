import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProgressComponent } from './pages/progress/progress.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    PagesComponent,
    NoPageFoundComponent,
    ProgressComponent,
  ],
  exports: [
    PagesComponent,
    NoPageFoundComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    ComponentsModule
  ]
})
export class PagesModule { }
