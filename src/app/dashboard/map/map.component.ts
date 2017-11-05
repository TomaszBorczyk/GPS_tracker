import { Component, OnInit } from '@angular/core';
import { GPS } from '../../models/gps.model';
import { default as mapMocks } from './map.mock';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public datasets: Array<object>;
  public positions: Array<GPS>;
  public centerLocation: GPS;
  public origin: GPS;
  public destination: GPS;

  constructor() {
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
  }

}
