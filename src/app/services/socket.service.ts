import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as io from 'socket.io-client';

import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { UserService } from './user.service';


@Injectable()
export class SocketService {
  private socketUrl: string;
  private socket;

  constructor(
      private my_userService: UserService
  ) {
    this.socketUrl = environment.socketUrl;
    this.socket = io(this.socketUrl);
    this.setSocketListen();
    console.log('im here');
  }

  private setSocketListen() {
    this.socket.on('bob', message => {
        console.log('wooo, hello');
    });

    this.socket.on('alert', message => {
        console.log(message);
    })
  }

  public emitUserId() {
      const userId = this.my_userService.getUserId();
      this.socket.emit('add-user', userId);
  }





}
