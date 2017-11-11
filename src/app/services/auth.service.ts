import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  apiServer: string;

  constructor(
    private http: Http,
    private router: Router,
    private my_userService: UserService
  ) {
    this.apiServer = environment.apiUrl;
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
        const user: User = res.json().user;
        this.my_userService.setUser(user);
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

  public getUser(): Promise<User> {
    return this.http
      .get(this.apiServer + '/user/user')
      .toPromise()
      .then( data => {
        const user: User = data.json().user;
        console.log('USER', user);
        if (user === undefined) {
          this.logout();
          throw new Error('user not foud on server');
        }
        return user;
      });
  }


  private postHTTP(route: string, body: Object): Promise<any> {
    return this
      .http
      .post(this.apiServer + route, body)
      .toPromise();
  }
}


