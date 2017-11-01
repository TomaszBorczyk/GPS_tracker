import { Component, Injectable, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

@Injectable()
export class DashboardComponent implements OnInit {
  public items: Array<object>;
  public user: User;

  constructor( private my_authService: AuthService) {
    this.items = [
      { name: 'Map', icon: 'my_location', link: 'map'},
      { name: 'Devices', icon: 'settings_remote', link: 'devices'},
      { name: 'Options', icon: 'settings', link: 'options'},
    ];

    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
  }

  public logout(): void {
    this.my_authService.logout();
  }


}
