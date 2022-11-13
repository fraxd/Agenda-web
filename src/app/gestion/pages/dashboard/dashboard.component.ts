import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/User.interface';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user:User = JSON.parse(localStorage.getItem('user') || (''));
  constructor( private router: Router, private afs:AngularFirestore ) { }

  ngOnInit(): void {
    this.afs.collection('sessions-Config').doc(this.user.uid).valueChanges().subscribe( res =>{
      if(!res) this.router.navigate(['/dashboard/disponibilidad']);
    })

    }


}
