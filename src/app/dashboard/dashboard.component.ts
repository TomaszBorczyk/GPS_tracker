import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private items: Array<object>;

  constructor() {
    this.items = [
      { name: 'Map', icon: 'my_location', link: 'map'},
      { name: 'Devices', icon: 'settings_remote', link: 'devices'},
      { name: 'Options', icon: 'settings', link: 'options'},
    ];
  }

  ngOnInit() {
  }

}
