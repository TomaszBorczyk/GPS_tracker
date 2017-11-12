import { Component, Injectable, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { SocketService } from '../services/socket.service';
import { UserService } from '../services/user.service';
import { AlertComponent } from './alert/alert.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

@Injectable()
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(AlertComponent) alertComponent: AlertComponent;
  public items: Array<object>;
  public user: User;

  constructor(
    private my_authService: AuthService,
    private my_userService: UserService,
    private my_socketService: SocketService) {
    this.items = [
      { name: 'Map', icon: 'my_location', link: 'map'},
      { name: 'Devices', icon: 'settings_remote', link: 'devices'},
      { name: 'Options', icon: 'settings', link: 'options'},
    ];

    this.loadUserLocalStorage();
    this.loadUserHttpAndSaveLocalStorage();
    this.my_socketService.init();
    this.my_socketService.emitUserId();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('bye');
    this.my_socketService.disconnect();
  }

  public logout(): void {
    this.my_authService.logout();
  }

  private loadUserLocalStorage(): void {
    this.user = this.my_userService.getUser();
  }

  private loadUserHttpAndSaveLocalStorage(): void {
    this.my_authService
    .getUser()
    .then( (user: User) => {
      this.user = user;
      this.my_userService.setUser(user);
    })
    .catch( err => console.log(err));
  }


}
