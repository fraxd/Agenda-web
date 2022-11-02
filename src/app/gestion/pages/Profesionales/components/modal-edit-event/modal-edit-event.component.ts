import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal-edit-event',
  templateUrl: './modal-edit-event.component.html',
  styleUrls: ['./modal-edit-event.component.css']
})
export class ModalEditEventComponent implements OnInit {

  constructor(public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    console.log(this.config.data)
  }

}
