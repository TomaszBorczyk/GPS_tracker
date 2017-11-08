import { Component, Input, OnInit } from '@angular/core';
import { Device } from '../../../models/device.model';
import { default as devicesMock } from './devices.mock';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
  public devices: Array<Device>;
  @Input() message: string;

  constructor( private my_userService: UserService) {
    // this.devices = devicesMock;
    this.devices = this.my_userService.getDevices();
    console.log(this.devices);
  }

  ngOnInit() {
  }

}
