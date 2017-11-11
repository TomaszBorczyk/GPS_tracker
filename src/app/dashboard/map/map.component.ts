import { AgmMap } from '@agm/core';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { UserService } from '../../services/user.service';

import { User } from '../../models/user.model';
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
    this.selectedActivity = null;
  }

  ngOnInit() {
    this.setDevices();
    this.setMap();
  }

  private setDevices(): void {
    this.devices = this.my_userService.getDevices();
    this.selectedDevice = this.devices === [] ? null : this.devices[0];
  }

  public selectDevice(device: Device): void {
    this.selectedDevice = device;
    this.selectedActivity = null;
  }

  public selectActivity(activity: GPSActivity): void {
    this.selectedActivity = activity;
    this.clearRoute();
    this.setMapCenter(activity.coords[0]);
    this.agmMap.triggerResize(true).then( () => console.log('resize triggered'));
  }

  public createRoute(): void {
    const coords: Array<Coord> = this.selectedActivity.coords;
    this.origin = coords[0];
    this.destination = coords[coords.length - 1];
    this.createRouteFlag = true;
  }

  public triggerRoute(): void {
    this.createRouteFlag = !this.createRouteFlag;
  }

  private clearRoute(): void {
    this.createRouteFlag = false;
  }

  private setMap(): void {
    this.setMapCenter({lat: 0, lon: 0, date: new Date()});
  }

  private setMapCenter(coord: Coord): void {
    this.centerLocation = coord;
  }




}
