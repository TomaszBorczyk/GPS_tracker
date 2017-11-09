import { AgmMap } from '@agm/core';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { UserService } from '../../services/user.service';

import { Coord } from '../../models/coords.model';
import { Device } from '../../models/device.model';
import { GPSActivity } from '../../models/gps.model';
import { default as mapMocks } from './map.mock';


// @Component({
//   selector: 'app-map-google',
// })
// class AgmMapCustomComponent extends AgmMap {
//   @ViewChild('cdire') route;

//   public callHello() {
//     this.route.hello();
//   }
// }


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  // @ViewChild(AgmMapCustomComponent) agmMap: AgmMapCustomComponent;
  @ViewChild(AgmMap) agmMap: AgmMap;

  public positions: Array<Coord>;
  public centerLocation: Coord;
  public origin: Coord;
  public destination: Coord;

  public gpsActivities: Array<GPSActivity>;
  public devices: Array<Device>;

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
    this.selectedActivity = this.gpsActivities[0];
    // this.selectedDevice = this.devices[1];
    this.selectDevice(this.devices[1]);
    this.centerLocation = this.selectedActivity.coords[0];

    const coords = this.selectedActivity.coords;
    const nullCoord: Coord = {lat: null, lon: null, date: null};
    this.createRoute(coords[0], coords[1]);
    this.createRoute(coords[0], coords[2]);
    this.createRoute(nullCoord, nullCoord);
    // this.agmMap.callHello();
  }

  public selectDevice(device: Device) {
    this.selectedDevice = device;
    this.gpsActivities = this.selectedDevice.gpsData;
    console.log(this.gpsActivities);
    this.selectActivity(device.gpsData[0]);
  }

  public selectActivity(activity: GPSActivity) {
    this.selectedActivity = activity;
    this.clearRoute();
    this.setMapCenter(activity.coords[0]);
    this.agmMap.triggerResize(true).then( () => console.log('resize triggered'));
  }

  //redundant? I already have devices, where is gpsData
  public getDeviceActivities(device: Device) {

  }

  public createRoute(origin: Coord, destination: Coord) {
    this.origin = origin;
    this.destination = destination;
    this.createRouteFlag = true;
  }

  private clearRoute() {
    this.createRouteFlag = false;
  }

  private setMapCenter(coord: Coord) {
    this.centerLocation = coord;
  }
  

}
