import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Device } from '../models/device.model';
import { User } from '../models/user.model';

@Injectable()
export class DeviceService {
  apiServer: string;

  constructor(
    private http: Http,
  ) {
    this.apiServer = environment.apiUrl;
  }

  public registerDevice( device: Device) {
      const body = { device: device };
      return this.postHTTP('/device/register', body)
        .then((res: Response) => {
          const data = res.json();
          console.log(data);
          if (data.success) {
              return data.device;
          } else {
              throw(data.err.message);
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


