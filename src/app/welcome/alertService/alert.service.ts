import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { AlertType } from '../AlertType/AlertType';

export interface AlertInfo {
  type: AlertType;
  message: string;
}

@Injectable()
export class AlertService {
  private alertTypeSource: BehaviorSubject<AlertInfo>;
  public alertType: Observable<AlertInfo>;

  constructor() {
    const startingAlertInfo: AlertInfo = { type: AlertType.NONE, message: '' };
    this.alertTypeSource = new BehaviorSubject<AlertInfo>(startingAlertInfo);
    this.alertType = this.alertTypeSource.asObservable();
  }

  public emitAlertType(alertType: AlertType, message) {
    const alertInfo: AlertInfo = { type: alertType, message: message};
    this.alertTypeSource.next(alertInfo);
  }

}
