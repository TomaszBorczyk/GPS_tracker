import { AgmMap } from '@agm/core';
import { Component, OnInit, ViewChild } from '@angular/core';

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

  public datasets: Array<object>;
  public positions: Array<Coord>;
  public centerLocation: Coord;
  public origin: Coord;
  public destination: Coord;

  public gpsActivities: Array<GPSActivity>;
  public devices: Array<Device>;

  public selectedActivity: GPSActivity;
  public selectedDevice: Device;

  constructor(
    private my_userService: UserService
  ) {
    this.datasets = [
      { name: 'Mon, 14.10.2017'},
      { name: 'Wen, 10.10.2017'},
      { name: 'Fri, 06.10.2017'}
    ];

    this.positions = mapMocks.markers;
    this.centerLocation = this.positions[this.positions.length - 1];
    this.origin = this.positions[0];
    this.destination = this.positions[1];

  }

  ngOnInit() {
    //handle if no devices or no activities
    this.devices = this.my_userService.getDevices();
    this.gpsActivities = this.my_userService.getDeviceGPSActivities(this.devices[0].deviceId);
    this.selectedActivity = this.gpsActivities[0];
    this.selectedDevice = this.devices[0];
    this.centerLocation = this.selectedActivity.coords[0];
  }

  public selectDevice(device: Device) {
    this.selectedDevice = device;
    this.gpsActivities = this.selectedDevice.gpsData;
    console.log(this.gpsActivities);
    this.selectActivity(device.gpsData[0]);
  }

  public selectActivity(activity: GPSActivity) {
    this.selectedActivity = activity;
    this.setMapCenter(activity.coords[0]);
    this.agmMap.triggerResize(true).then( () => console.log('resize triggered'));
  }

  //redundant? I already have devices, where is gpsData
  public getDeviceActivities(device: Device) {

  }

  private setMapCenter(coord: Coord) {
    this.centerLocation = coord;
  }

}
