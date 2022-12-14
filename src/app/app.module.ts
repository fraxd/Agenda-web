import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


//Modulos
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientModule } from '@angular/common/http';
import { provideStorage, getStorage } from '@angular/fire/storage'

//Componentes
import { AppComponent } from './app.component';

//OTROS
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './gestion/pages.module';
import { AuthModule } from './gestion/auth/auth.module'
import { PacientesModule } from './gestion/pages/Pacientes/pacientes.module';
import { AdminModule } from './gestion/pages/admin/admin.module';



@NgModule({
  declarations: [
    AppComponent,
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage( () => getStorage()),
    NgbModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    ReactiveFormsModule,
    HttpClientModule,
    /// MODULOS DE COMPONENTES
    SharedModule,
    PagesModule,
    AuthModule,
    PacientesModule,
    AdminModule
    

  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
