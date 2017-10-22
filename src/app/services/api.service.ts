import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Config } from '../../config/config';
import { User } from '../models/user.model';

@Injectable()
export class ApiService {
  apiServer: string = Config.apiLocal;

  constructor(
    private http: Http,
    private router: Router
  ) { }



  public register(email: string, password: string): Promise<void> {
    const body = {email: email, password: password };

    return this.postHTTP('/user/register', body)
      .then(res => {
        const resUser: User = res.json().user;
        console.log(resUser);
      });

    // return this
    //   .http
    //   .post(this.apiServer + '/user/register', body)
    //   .toPromise()
    //   .then(res => {
    //     const resUser: User = res.json().user;
    //     // this.router.navigate(['']);
    //   });
  }

  public login(email: string, password: string): Promise<void> {
    const body = {email: email, password: password };
    return this
      .http
      .post(this.apiServer + '/user/login', body)
      .toPromise()
      .then(res => {
        const resUser: User = res.json().user;
        // this.router.navigate(['']);
      });
  }

  private postHTTP(route: string, body: Object): Promise<any> {
    return this
      .http
      .post(this.apiServer + route, body)
      .toPromise();
  }
}


