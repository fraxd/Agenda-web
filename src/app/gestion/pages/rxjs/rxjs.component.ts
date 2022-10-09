import { Component, OnInit } from '@angular/core';
import { interval, map, Observable, Observer, retry, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {


  constructor() { 

    // this.retornaObservable().pipe(
    //   retry()
    // ).subscribe(
    //   valor => console.log('subs', valor),
    //   error => console.error('error',error),
    //   () => console.info('obs terminado')
    // );
    this.retornaIntervalo().subscribe( (valor) =>{
      console.log(valor);
    })
  }

  ngOnInit(): void {
  }

  retornaIntervalo(){
    return interval(500)
            .pipe(
              take(10),
              map(valor => valor + 1)
            );

  }

  retornaObservable(): Observable<number>{
    let i = -1;

    const obs$ = new Observable<number>( observer =>{
      const intervalo = setInterval( () =>{
        i++;
        observer.next(i);

        if(i===4){
          clearInterval( intervalo);
          observer.complete();
        }

        if(i===2){
          observer.error('i llego al valor de 2');
        }


      },1000)
    } );

    return obs$;
  }
}
