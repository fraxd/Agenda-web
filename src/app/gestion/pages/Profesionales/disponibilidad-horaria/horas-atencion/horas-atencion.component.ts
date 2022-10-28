import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-horas-atencion',
  templateUrl: './horas-atencion.component.html',
  styleUrls: ['./horas-atencion.component.css']
})
export class HorasAtencionComponent implements OnInit {

  diasSelected: string[] = []; // Array con los dias seleccionados  - TEMPORAL
  dias: string[]= [ 'Lunes', 'Martes', 'Miercoles','Jueves','Viernes']; 
  diasOrder: string[] =[]; // ARRAY ORDENADO CON LOS DIAS
  horaInicio: any[] = []; // formato UTC 
  horaFin: any[] = []; // formato UTC 



  constructor( private toastr:ToastrService, private router:Router) {
 
   }

  ngOnInit(): void {
    this.diasSelected = JSON.parse(localStorage.getItem('Dias') || ("[]"));
    this.orderbyday()
  }

  orderbyday(){
    for (let i=0; i<5; i++){
        this.diasSelected.forEach(element => {
          if(element == this.dias[i]) this.diasOrder.push(element);
        });
    }
    localStorage.setItem('dias',JSON.stringify(this.orderbyday));
  }

  submit(){

 
    for (let i=0; i<this.diasOrder.length; i++){
      if(this.horaFin[i] && this.horaInicio[i]){
        if(this.horaFin[i]<this.horaInicio[i]){
          this.toastr["error"]("La hora definidas como fin deben ser mayores a la de inicio.");
          return null;
        }
      }
      else{
        this.toastr["error"]("Parece que no llenaste todas las casillas", "Error Datos ");
        return null;
      }
    }
    this.almacenaLocalStorage();
    this.router.navigate(['/dashboard/disponibilidad/config-atencion'])
    return null
  }
  almacenaLocalStorage(){
    localStorage.setItem("horaInicio", JSON.stringify(this.horaInicio));
    localStorage.setItem("horaFin", JSON.stringify(this.horaFin));
  }
  
  retroceder(){
    this.router.navigate(['dashboard/disponibilidad/dias-atencion']);
  }

}
