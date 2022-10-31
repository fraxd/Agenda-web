import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { configSession } from 'src/app/core/interfaces/config-sesion.interface';
import { DisponibilidadService } from 'src/app/core/services/disponibilidad.service';

@Component({
  selector: 'app-dias-atencion',
  templateUrl: './dias-atencion.component.html',
  styleUrls: ['./dias-atencion.component.css']
})
export class DiasAtencionComponent implements OnInit {

  disponibilidadHoraria: FormGroup;
  diasForm: FormGroup;
  diasSelected: Array<string> = []; // Array con los dias seleccionados 
  dias: Array<any> = [
    { name: 'Lunes', value: 1 },
    { name: 'Martes', value: 2 },
    { name: 'Miercoles', value: 3 },
    { name: 'Jueves', value: 4  },
    { name: 'Viernes', value: 5 }
  ];

  constructor(private readonly fb: FormBuilder, 
              private toastr: ToastrService, 
              private router: Router,
              private dispService: DisponibilidadService,
              private confirmationService: ConfirmationService
            
              ) { 
    this.diasForm = fb.group({
      checkArray: this.fb.array([], [Validators.required]),
    });
  }
  configPrevia: configSession;

  ngOnInit(): void {

    this.dispService.recibirDatosBDbyUID ().subscribe( (config) =>{
      this.configPrevia = config as configSession;
      if(this.configPrevia){
        this.setearValores(); // solo avisa que hay datos previos :(
      }
    });


  }

  //Añade o quita del array las opciones seleccionadas
  onCheckboxChange(e:any, name: string) {
    const checkArray: FormArray = this.diasForm.get('checkArray') as FormArray;
      if(e.checked.length) {
        checkArray.push(new FormControl(name));
      } else {
        let i: number = 0;
        checkArray.controls.forEach((item: any) => {
        
          if (item.value == name) {
            checkArray.removeAt(i);
            return;
          }
          i++;
        });
    }
  }

  // ordenada todo en un array, procede a guardarlo y dirigir a Horas Atencion
  submit() {
    const checkArray: FormArray = this.diasForm.get('checkArray') as FormArray;
    checkArray.controls.forEach((item:any) =>{
      this.diasSelected.push(item.value);
    } )
    if(this.diasSelected.length==0) this.toastr.warning("OJO: indicaste que no atenderas Ningun dia") 
    else{
      this.almacenaLocalStorage();
      this.router.navigate(['dashboard/disponibilidad/horas-atencion']);
    }  
  }
  // Los datos del array dias son enviado al localStorage
  almacenaLocalStorage(){
    localStorage.setItem("Dias", JSON.stringify(this.diasSelected));
  }

  //Setea los valores iniciales del sistema
  setearValores(){
    /** Se buscaba precargar valores por defecto pero lamentablemente no se pudo, queda pendiente para futura 
     * iteracion.
     * Temporalmente el sistema solamente avisara que ya existe una configuracion ya definida y se sobrescribira.
     */

    this.confirmationService.confirm({
    message: '¡Usted ya tiene una configuracion, Si continua se sobrescribira la anterior. \n ¿Desea seguir?',
    reject: () => {
        this.router.navigate(['/dashboard']);
    },
    acceptLabel: 'Si, estoy seguro.'
    });
  }


}
