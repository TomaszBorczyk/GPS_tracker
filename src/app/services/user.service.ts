import { Injectable } from '@angular/core';

import { Device } from '../models/device.model';
import { GPSActivity } from '../models/gps.model';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

  constructor(
  ) {
  }

  public getUserId(): string {
      return this.getUserLocalStorage().id;
  }

  public getUser(): User {
      return this.getUserLocalStorage();
  }

  public getDevices(): Array<Device> {
    return this.getUserLocalStorage().devices;
  }

  public getDeviceGPSActivities(deviceId: string): Array<GPSActivity> {
    const device: Device = this.getUserLocalStorage().devices.filter( _device => _device.deviceId === deviceId)[0];
    console.log(device);
    return device.gpsData;
  }

  private getUserLocalStorage() {
    const user: User =  JSON.parse(localStorage.getItem('user'));
    return user;
  }
}
