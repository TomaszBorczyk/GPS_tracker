import { Injectable, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DevicesComponent } from './dashboard/devices/devices.component';
import { MapComponent } from './dashboard/map/map.component';
import { OptionsComponent } from './dashboard/options/options.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'dashboard', component: DashboardComponent,
        children: [
          { path: '', redirectTo: 'map', pathMatch: 'full' },
          { path: 'map', component: MapComponent },
          { path: 'devices', component: DevicesComponent },
          { path: 'options', component: OptionsComponent }
        ]
      },
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent},
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login', pathMatch: 'full' }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
