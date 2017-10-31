import { Component, Injectable, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

@Injectable()
export class DashboardComponent implements OnInit {
  private items: Array<object>;

  constructor( private my_authService: AuthService) {
    this.items = [
      { name: 'Map', icon: 'my_location', link: 'map'},
      { name: 'Devices', icon: 'settings_remote', link: 'devices'},
      { name: 'Options', icon: 'settings', link: 'options'},
    ];
  }

  ngOnInit() {
  }

  private logout(): void {
    this.my_authService.logout();
  }


}
