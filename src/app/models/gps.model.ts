import { Coord } from './coords.model';

export interface GPSActivity {
    wakeupTime: Date;
    coords: Array<Coord>;
}

