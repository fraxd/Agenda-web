import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  // public selectedValues: string[] = [];

  constructor(private readonly fb: FormBuilder, 
              private toastr: ToastrService, 
              private router: Router,
              private dispService: DisponibilidadService
              ) { 
    this.diasForm = fb.group({
      //selectedDias:  new FormArray([])
      checkArray: this.fb.array([], [Validators.required]),
    });
  }

  ngOnInit(): void {
  }
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

  almacenaLocalStorage(){
    localStorage.setItem("Dias", JSON.stringify(this.diasSelected));
  }


}
