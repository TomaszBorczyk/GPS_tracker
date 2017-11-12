import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
    public deviceId = new Subject<string>();

    constructor() {
    }

    public newAlert(deviceId: string): void {
        this.deviceId.next(deviceId);
    }

}
