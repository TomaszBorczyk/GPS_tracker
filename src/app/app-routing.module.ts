import { Injectable, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DevicesComponent } from './dashboard/devices/devices.component';
import { MapComponent } from './dashboard/map/map.component';
import { OptionsComponent } from './dashboard/options/options.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@Injectable()
export class IsLoggedIn implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    const isLoggedIn: boolean = localStorage.getItem('user') != null;
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
    }
    return isLoggedIn;
  }
}

@Injectable()
export class IsLoggedOut implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    const isLoggedOut: boolean = localStorage.getItem('user') == null;
    if (!isLoggedOut) {
      this.router.navigate(['/dashboard']);
    }
    return isLoggedOut;
  }
}


@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'dashboard', component: DashboardComponent, canActivate: [IsLoggedIn],
        children: [
          { path: '', redirectTo: 'map', pathMatch: 'full' },
          { path: 'map', component: MapComponent },
          { path: 'devices', component: DevicesComponent },
          { path: 'options', component: OptionsComponent }
        ]
      },
      { path: 'login', component: LoginComponent, canActivate: [IsLoggedOut]},
      { path: 'register', component: RegisterComponent, canActivate: [IsLoggedOut]},
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login', pathMatch: 'full' }
    ])
  ],
  providers: [IsLoggedIn, IsLoggedOut],
  exports: [RouterModule]
})
export class AppRoutingModule {}
