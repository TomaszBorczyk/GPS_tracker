import { Component } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  private socket;

  constructor() {
    // this.socket = io('http://127.0.0.1:4567');
    // this.socket.on('connect', () => {
    //   console.log('connected');
    //   this.socket.emit('my-id', this.socket.id);
    //   this.socket.on('bob', message => {
    //     console.log(message);
    //     console.log(this.socket.id);
    //   });
    // });
  }

}

