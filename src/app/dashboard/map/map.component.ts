import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';

import { Coord } from '../../models/coords.model';
import { GPSActivity } from '../../models/gps.model';
import { default as mapMocks } from './map.mock';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public datasets: Array<object>;
  public positions: Array<Coord>;
  public centerLocation: Coord;
  public origin: Coord;
  public destination: Coord;

  public gpsActivities: Array<GPSActivity>;

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

    this.gpsActivities = this.my_userService.getDeviceGPSActivities('Device1');
    console.log(this.gpsActivities);
  }

  ngOnInit() {
  }

}
