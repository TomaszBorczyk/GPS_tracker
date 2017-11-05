import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lat: number = 51.678418;
  lng: number = 7.809007;
  public datasets: Array<object>;

  constructor() {
    this.datasets = [
      { name: 'Mon, 14.10.2017'},
      { name: 'Wen, 10.10.2017'},
      { name: 'Fri, 06.10.2017'}
    ];
  }

  ngOnInit() {
  }

}
