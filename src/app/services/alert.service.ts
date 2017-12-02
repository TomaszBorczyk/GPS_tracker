import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
    public alert = new Subject<any>();

    constructor() {
    }

    public newAlert(deviceId: string, name: string, type: string): void {
        const alertData = {deviceId: deviceId, name: name, type: type};
        this.alert.next(alertData);
    }

}
