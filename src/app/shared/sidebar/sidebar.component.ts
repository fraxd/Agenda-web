import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { SidebarService } from 'src/app/core/services/sidebar.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItem:any[];

  nombre: string;

  constructor(public sideBarService: SidebarService){
    this.menuItem = sideBarService.menu;
    this.nombre = localStorage.getItem('nombre') || 'Usuario/a';
  }


  ngOnInit() {}
      
}