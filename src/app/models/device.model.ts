import { GPS } from './gps.model';

export interface Device {
    imei: string;
    gpsData?: Array<GPS>;
    date?: Date;
}
