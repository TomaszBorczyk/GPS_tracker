import { AgmMap } from '@agm/core';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { UserService } from '../../services/user.service';

import { Coord } from '../../models/coords.model';
import { Device } from '../../models/device.model';
import { GPSActivity } from '../../models/gps.model';
import { default as mapMocks } from './map.mock';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild(AgmMap) agmMap: AgmMap;

  public centerLocation: Coord;
  public origin: Coord;
  public destination: Coord;
  public gpsActivities: Array<GPSActivity>;
  public devices: Array<Device>;
  public positions: Array<Coord>;

  public selectedActivity: GPSActivity;
  public selectedDevice: Device;

  public createRouteFlag: boolean;

  constructor(
    private my_userService: UserService
  ) {
    this.createRouteFlag = false;
  }

  ngOnInit() {
    //handle if no devices or no activities
    this.devices = this.my_userService.getDevices();
    this.gpsActivities = this.my_userService.getDeviceGPSActivities(this.devices[0].deviceId);
    this.selectDevice(this.devices[0]);
    // this.centerLocation = this.selectedActivity.coords[0];
  }

  public selectDevice(device: Device) {
    this.selectedDevice = device;
    this.gpsActivities = this.selectedDevice.gpsData;
    console.log(this.gpsActivities);
    this.selectActivity(device.gpsData[0]);
  }

  public selectActivity(activity: GPSActivity) {
    // this.selectedActivity = new GPSActivity(activity.wakeupTime, activity.coords);
    this.selectedActivity = activity;
    this.clearRoute();
    this.setMapCenter(activity.coords[0]);
    this.agmMap.triggerResize(true).then( () => console.log('resize triggered'));
  }

  //redundant? I already have devices, where is gpsData
  public getDeviceActivities(device: Device) {

  }

  public createRoute() {
    const coords: Array<Coord> = this.selectedActivity.coords;
    console.log('activity', this.selectedActivity);
    // const activity = new GPSActivity(this.selectedActivity);
    // this.selectedActivity.sayHello();
    this.origin = coords[0];
    this.destination = coords[coords.length - 1];
    this.createRouteFlag = true;
  }

  public triggerRoute(): void {
    this.createRouteFlag = !this.createRouteFlag;
    console.log(this.createRouteFlag);
  }

  private clearRoute() {
    this.createRouteFlag = false;
  }

  private setMapCenter(coord: Coord) {
    this.centerLocation = coord;
  }
  

}
