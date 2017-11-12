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
  public link: string;
  public deviceId: string;

  constructor(
    private router: Router,
    private my_alertService: AlertService
  ) {
    this.visible = false;
    this.link = '/dashboard/devices';
  }

  ngOnInit() {
    this.my_alertService.deviceId.subscribe( deviceId => {
      this.deviceId = deviceId;
      this.visible = true;
    });
  }

  public showAlert(deviceId: string) {
    this.visible = true;
    this.deviceId = deviceId;
  }

  public closeAlert(): void {
    this.visible = false;
  }

  public routeToMap(): void {
    this.router.navigate(['dashboard/map/device1']);
    this.closeAlert();
  }
}
