import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcumbs',
  templateUrl: './breadcumbs.component.html',
  styleUrls: ['./breadcumbs.component.css']
})
export class BreadcumbsComponent implements OnInit {

  public titulo: string;
  public titulosubs$: Subscription

  constructor(private router: Router) { 
    this.titulosubs$ = this.getParametrosRuta().
                            subscribe( ({titulo}) => {
                            this.titulo = titulo;
                            document.title = `AgendaWeb - ${ titulo }`;
                          });
  }

  ngOnInit(): void {
  }

  getParametrosRuta() {
    
    return this.router.events.
          pipe(
            filter((event:any) => event instanceof ActivationEnd),
            filter((event:ActivationEnd) => event.snapshot.firstChild === null ),
            map((event:ActivationEnd) => event.snapshot.data),
          );

  }
}
