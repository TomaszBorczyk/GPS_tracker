import { AgmMap } from '@agm/core';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../../services/user.service';

import { Coord } from '../../models/coords.model';
import { Device } from '../../models/device.model';
import { GPSActivity } from '../../models/gps.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild(AgmMap) agmMap: AgmMap;

  private routeDevice: string;
  private subscription: Subscription;

  public centerLocation: Coord;
  public origin: Coord;
  public destination: Coord;
  public gpsActivities: Array<GPSActivity>;
  public devices: Array<Device>;
  public positions: Array<Coord>;

  public selectedActivity: GPSActivity;
  public selectedDevice: Device;

  public routeFlag: boolean;

  constructor(
    private my_userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    this.routeFlag = false;
    this.selectedActivity = null;
    this.routeDevice = '';
  }

  ngOnInit() {
    // this.setMap();
    this.activatedRoute.queryParams.subscribe( params => {
      console.log('hello');
      this.routeDevice = params['device'] || '';
      this.setDevices();
      this.setMap();
    });

    

  }

  private setDevices(): void {
    this.devices = this.my_userService.getDevices();
    // this.selectedDevice = this.devices === [] ? null : this.devices[0];
    if (this.devices === []) {
      return;
    }
    const device: Device =  this.devices.find( _device => _device.deviceId === this.routeDevice);
    if (device !== undefined) {
      this.selectedDevice = device;
    } else {
      this.selectedDevice = this.devices[0];
    }

    // this.selectedDevice = this.devices === [] ?
    //                       null : this.routeDevice === '' ?
    //                       this.devices[0] : this.devices.find( device => device.deviceId === this.routeDevice) === undefined ?
    //                       this.devices[0] : 
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
    this.routeFlag = true;
  }

  public triggerRoute(): void {
    this.routeFlag = !this.routeFlag;
  }

  private clearRoute(): void {
    this.routeFlag = false;
  }

  private setMap(): void {
    this.setMapCenter({lat: 0, lon: 0, date: new Date()});
  }

  private setMapCenter(coord: Coord): void {
    this.centerLocation = coord;
  }




}
