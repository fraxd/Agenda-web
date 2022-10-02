import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit  {
  
  
  ngOnInit(){
    this.btnClass = `btn ${ this.btnClass }`;
  }

 
  @Input('valor') progreso: number = 75;
  @Input() btnClass: string = 'btn-primary';

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  cambiarValor( valor:number ){
    if ( this.progreso >= 100 && valor==5){
      valor = 0;
      this.valorSalida.emit(100);
      this.progreso = 100;
    } 

    if (this.progreso <= 0 && valor ==-5){
      valor = 0;
      this.progreso =0;
      this.valorSalida.emit(0);
    }

    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);

  }

  onChange(valor:number){
    if( valor >= 100){
      this.progreso = 100;
    } else if (valor <= 0){
      this.progreso = 0;
    } else {
      this.progreso = valor;
    }
    
    this.valorSalida.emit(this.progreso);

  }
}
