import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { default as consts } from '../../config/consts';
import { AlertInfo, AlertService } from './alertService/alert.service';
import { AlertType } from './AlertType/AlertType';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  private alertMessage: string;
  private alertType: AlertType;
  private alertSubscription: Subscription;
  private icon: string;

  constructor(private my_alerService: AlertService) {
    this.alertType = AlertType.NONE;
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
}
