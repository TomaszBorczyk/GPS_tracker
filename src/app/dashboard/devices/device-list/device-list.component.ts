import { Component, Input, OnInit } from '@angular/core';
import { Device } from '../../../models/device.model';
import { default as devicesMock } from './devices.mock';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
  public devices: Array<Device>;
  @Input() message: string;

  constructor() {
    this.devices = devicesMock;
  }

  ngOnInit() {
  }

}
