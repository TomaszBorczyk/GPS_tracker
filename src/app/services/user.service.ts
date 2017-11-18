import { Injectable } from '@angular/core';

import { Coord } from '../models/coords.model';
import { Device } from '../models/device.model';
import { GPSActivity } from '../models/gps.model';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

  constructor() {}

  public setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserId(): string {
      return this.getUserLocalStorage()._id;
  }

  public getUser(): User {
      return this.getUserLocalStorage();
  }

  public getDevices(): Array<Device> {
    const devices = this.getUserLocalStorage().devices;
    return devices === undefined ? [] : devices;
  }

  public getDeviceGPSActivities(deviceId: string): Array<GPSActivity> {
    console.log('devices', this.getDevices());
    const device: Device = this.getDevices().filter( _device => _device.deviceId === deviceId)[0];
    console.log('device', device);
    return device.gpsData === undefined ? [] : device.gpsData;
  }

  private getUserLocalStorage(): User {
    const user: User =  JSON.parse(localStorage.getItem('user'));
    return user;
  }

  public addDeviceActivity(message): void {
    const { deviceId, coords, wakeupTime } = message;
    const gpsActivity: GPSActivity = {
      wakeupTime: wakeupTime,
      coords: coords
    };
    const user: User = this.getUserLocalStorage();
    user.devices
      .find( device => device.deviceId === deviceId)
      .gpsData
      .push(gpsActivity);
    this.setUser(user);
  }

  public addRegisteredDevice(device: Device): void {
    const user: User = this.getUserLocalStorage();
    user.devices.push(device);
    this.setUser(user);
  }

  public updateDeviceLocation(message): void {
    const { deviceId, coords, wakeupTime } = message;
    const newLocation: Coord = coords;
    const user: User = this.getUserLocalStorage();
    user.devices
      .find( device => device.deviceId === deviceId)
      .gpsData
      .find( data => data.wakeupTime === wakeupTime )
      .coords.push(newLocation);

    this.setUser(user);
  }
}
