import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DevicesComponent } from './dashboard/devices/devices.component';
import { MapComponent } from './dashboard/map/map.component';
import { OptionsComponent } from './dashboard/options/options.component';
import { AuthService } from './services/auth.service';
import { AlertService } from './welcome/alertService/alert.service';
import { LoginComponent } from './welcome/login/login.component';
import { RegisterComponent } from './welcome/register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    MapComponent,
    DevicesComponent,
    OptionsComponent,
    WelcomeComponent
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
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
