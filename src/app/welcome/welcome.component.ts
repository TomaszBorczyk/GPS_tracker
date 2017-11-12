import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { default as consts } from '../../config/consts';
import { AlertInfo, AlertService } from './alertService/alert.service';
import { AlertType } from './AlertType/AlertType';

interface Triangle {
  x: number;
  y: number;
  size: string;
  height: string;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  private alertSubscription: Subscription;
  public alertMessage: string;
  public alertType: AlertType;
  public icon: string;

  public triangles: Array<Triangle>;

  constructor(private my_alerService: AlertService) {
    this.alertType = AlertType.NONE;
    this.triangles = this.generateTriangleData();
  }

  ngOnInit() {
    this.alertSubscription = this.my_alerService
      .alertType
      .subscribe( alertInfo => {
          this.setAlertBar(alertInfo);
      });
    }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
  }

  private setAlertBar(alertInfo: AlertInfo) {
    const { type, message } = alertInfo;
    this.alertType = type;
    this.alertMessage = type === AlertType.SUCCESS ? consts.alertBar[type] : message;
    this.icon = type === AlertType.SUCCESS ? 'done' : 'warning';
  }

  private generateTriangleData(): Array<Triangle> {
    const amount = 10;
    const triangleData: Array<Triangle> = [];

    for (let i = 0; i < amount; i += 1) {
      const size = Math.floor(Math.random() * 40) + 20;
      const triangle: Triangle = {
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100),
        size: size + 'px',
        height: 1.73205 * size + 'px'
      };
      triangleData.push(triangle);
    }
    console.log(triangleData);
    return triangleData;

  }
}
