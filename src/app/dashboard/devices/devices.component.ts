import { Component, OnInit } from '@angular/core';
import { Device } from '../../models/device.model';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  message: string;

  constructor() {
    this.message = '';
  }

  ngOnInit() {
  }

  emitEvent(message: string) {
    console.log(message);
    this.message = message;
  }

}
