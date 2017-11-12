import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { default as consts } from '../../config/consts';
import { AlertInfo, AlertService } from './alertService/alert.service';
import { AlertType } from './AlertType/AlertType';

interface Triangle {
  bottom: number;
  left: number;
  size: string;
  height: string;
  opacity: number;
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
    const triangleData: Array<Triangle> = [];
    const amount = 30;
    const minSize = 10;
    const maxSize = 100;

    for (let i = 0; i < amount; i += 1) {
      const size = Math.floor(Math.random() * (maxSize - minSize)) + minSize;
      const triangle: Triangle = {
        left: Math.floor(Math.random() * 70) + 15,
        bottom: Math.floor(Math.random() * 70) + 10,
        size: size + 'px',
        height: 1.73205 * size + 'px',
        opacity: 1 - (size / maxSize)
      };
      triangleData.push(triangle);
    }
    return triangleData;
  }
}
