import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DevicesComponent } from './dashboard/devices/devices.component';
import { DirectionsMapDirective } from './dashboard/map/map-direction.directive';
import { MapComponent } from './dashboard/map/map.component';
import { OptionsComponent } from './dashboard/options/options.component';

import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { DeviceService } from './services/device.service';
import { SocketService } from './services/socket.service';
import { UserService } from './services/user.service';

import { LoginAlertService } from './welcome/alertService/alert.service';
import { LoginComponent } from './welcome/login/login.component';
import { RegisterComponent } from './welcome/register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { AlertComponent } from './dashboard/alert/alert.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    MapComponent,
    DevicesComponent,
    OptionsComponent,
    WelcomeComponent,
    DirectionsMapDirective,
    AlertComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCJQ3YYQe4d37-LIG_84zwUQF4_Bior3ZA'
    })
  ],
  providers: [
    AlertService,
    LoginAlertService,
    AuthService,
    DeviceService,
    SocketService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
