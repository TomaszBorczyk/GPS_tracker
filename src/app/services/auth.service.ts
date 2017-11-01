import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Config } from '../../config/config';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
  apiServer: string;

  constructor(
    private http: Http,
    private router: Router
  ) {
    if (process.env.PRODUCTION) {
      this.apiServer = Config.apiRemote;
    } else {
      this.apiServer = Config.apiLocal;
    }
  }


  public register(email: string, password: string): Promise<boolean> {
    const body = {email: email, password: password };

    return this
      .postHTTP('/user/register', body)
      .then( (res: Response) => {
        const resJson = res.json();
        if (resJson.success === true) {
          return true;
        } else {
          throw(resJson.error.message);
        }
      });
  }

  public login(email: string, password: string): Promise<void> {
    const body = {email: email, password: password };
    return this
      .postHTTP('/user/login', body)
      .then( (res: Response) => {
        const resUser: User = res.json().user;
        localStorage.setItem('user', JSON.stringify(resUser));
        this.router.navigate(['/dashboard']);
      });
    }

  public logout(): void {
    localStorage.removeItem('user');
    this
      .postHTTP('/user/logout', {})
      .then( (res: Response) => {
        if (res.json().success === true) {
          this.router.navigate(['/login']);
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


