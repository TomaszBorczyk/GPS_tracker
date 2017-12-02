import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  public visible: boolean;
  public deviceId: string;
  public name: string;
  public type: string;

  constructor(
    private router: Router,
    private my_alertService: AlertService
  ) {
    this.visible = false;
  }

  ngOnInit() {
    this.my_alertService.alert.subscribe( alertData => {
      this.showAlert(alertData.deviceId, alertData.name, alertData.type);
    });
  }

  private showAlert(deviceId: string, name: string, type: string) {
    this.visible = true;
    this.deviceId = deviceId;
    this.name = name;
    this.type = type;

    if(type === 'update') {
      setTimeout( () => this.visible = false, 4000);
    }
  }

  public closeAlert(): void {
    this.visible = false;
  }

  public routeToMap(): void {
    if (this.router.url.startsWith('/dashboard/map')) {
      this.router.navigate(['dashboard/map'], { queryParams: { device: this.deviceId, id: Math.random() * 10000 }});
    } else {
      this.router.navigate(['dashboard/map'], { queryParams: { device: this.deviceId}});
    }
    this.closeAlert();
  }
}
