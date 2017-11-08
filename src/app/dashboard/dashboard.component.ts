import { Component, Injectable, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { SocketService } from '../services/socket.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

@Injectable()
export class DashboardComponent implements OnInit {
  public items: Array<object>;
  public user: User;

  constructor( private my_authService: AuthService, private my_socketService: SocketService, private my_userService: UserService) {
    this.items = [
      { name: 'Map', icon: 'my_location', link: 'map'},
      { name: 'Devices', icon: 'settings_remote', link: 'devices'},
      { name: 'Options', icon: 'settings', link: 'options'},
    ];

    this.user = my_userService.getUser();
    this.my_socketService.emitUserId();
  }

  ngOnInit() {
  }

  public logout(): void {
    this.my_authService.logout();
  }


}
