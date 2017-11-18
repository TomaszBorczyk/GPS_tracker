import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { Device } from '../models/device.model';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable()
export class DeviceService {
  apiServer: string;

  constructor(
    private http: Http,
    private my_userService: UserService
  ) {
    this.apiServer = environment.apiUrl;
  }

  public registerDevice( device: Device) {
      const body = device;
      return this.postHTTP('/device/register', body)
        .then((res: Response) => {
          const data = res.json();
          console.log(data);
          if (data.success) {
              this.my_userService.addRegisteredDevice(data.device);
              return data.device;
          } else {
              throw new Error(data.err.message);
          }
      });
  }

  public changeName( deviceId: string, name: string): Promise<Device> {
    const body = { deviceId: deviceId, name: name};
    return this.postHTTP('/device/changename', body)
    .then((res: Response) => {
      const data = res.json();
      console.log(data);
      if (data.success) {
          this.my_userService.changeDeviceName(deviceId, name);
          return data.device;
      } else {
          throw new Error(data.err.message);
      }
    });
  }

  private postHTTP(route: string, body: Object): Promise<any> {
    return this
      .http
      .post(this.apiServer + route, body)
      .toPromise();
  }
}


