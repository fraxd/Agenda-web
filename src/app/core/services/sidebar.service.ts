import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'dashboard', url:'/'},
        { titulo: 'ProgressBar', url:'progress'},
        { titulo: 'graficas', url:'grafica1'},
      ]
    },
    {
      titulo: 'promesas',
      icon: 'mdi mdi-alert',
      submenu: [
        { titulo: 'promesas 1', url:'promesas'},
        { titulo: 'promesas 1', url:'promesas'},
        { titulo: 'promesas 1', url:'promesas'}


      ]
    }
  ]



  constructor() { }
}
