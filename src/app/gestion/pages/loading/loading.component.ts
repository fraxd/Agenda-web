import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(private router: Router) { }

  userRol: string;
  ngOnInit(): void {
    setTimeout(() => {
      this.userRol = localStorage.getItem('userRol') as string ;
      if(this.userRol == 'paciente'){
        this.router.navigate(['/hubsalud']);
      } else this.router.navigate(['/dashboard']);

    }, 2000);




  }

}
