import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/core/services/sidebar.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItem:any[];

  constructor(private sideBarService: SidebarService){
    this.menuItem = sideBarService.menu;
  }


  ngOnInit() {}
      
}