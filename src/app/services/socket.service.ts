import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import { environment } from '../../environments/environment';
import { AlertService } from './alert.service';
import { UserService } from './user.service';


@Injectable()
export class SocketService {
  private socketUrl: string;
  private socket;

  constructor(
      private my_userService: UserService,
      private my_alertService: AlertService
  ) {
    this.socketUrl = environment.socketUrl;
  }

  private setSocketListen() {
    this.socket.on('alert', message => {
        console.log('alert', message);
        this.my_alertService.newAlert('random device');
    });

    this.socket.on('update', message => {
        console.log('update', message);
        this.my_alertService.newAlert('random device');
    });
  }

  public init(): void {
    this.socket = io(this.socketUrl);
    this.setSocketListen();
    console.log('im here');
  }

  public emitUserId() {
      const userId = this.my_userService.getUserId();
      console.log('emit userid', userId);
      this.socket.emit('add-user', userId);
  }

  public disconnect() {
     this.socket.disconnect();
  }







}
