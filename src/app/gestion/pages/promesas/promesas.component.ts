import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios(); 
  //   const promesa = new Promise( ( resolve ) => {
  //     resolve('hola mundo');
  //   });

  //   promesa.then( (mensaje) =>{
  //     console.log(mensaje)
  //   });

  //   console.log('fin de la funcion');


  }

  getUsuarios(){
    fetch('https://reqres.in/api/users')
      .then(resp =>{
        resp.json().then( body => console.log(body));
      });
  }

}
