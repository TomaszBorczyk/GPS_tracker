import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { DeviceService } from '../../services/device.service';
import { UserService } from '../../services/user.service';

import { Device } from '../../models/device.model';
import { GPSActivity } from '../../models/gps.model';


@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  public devices: Array<Device>;
  public message: string;
  public registerForm: FormGroup;
  public formErrors = {'imei': ''};
  public validationMessages = {
    'imei': {
      'required': 'IMEI is required',
      'used': 'This IMEI is already registered',
      'imei': ' This is not a correct IMEI number'
    },
  };
  public edited: number;
  public newName: string;

  constructor(
    private my_userService: UserService,
    private fb: FormBuilder,
    private my_authService: AuthService,
    private my_deviceService: DeviceService
  ) {
    this.message = '';
    this.devices = this.my_userService.getDevices();
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.registerForm = this.fb.group({
      'imei': [, [Validators.required, this.isIMEI] ],
    });

    this.registerForm.valueChanges
        .subscribe(
          data => this.onValueChanged(data)
        );

    this.onValueChanged();
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('submit');
      const newDevice: Device = { deviceId: this.registerForm.get('imei').value };
      this.my_deviceService
      .registerDevice(newDevice)
      .then( (device: Device) => {console.log(device); this.devices.push(device);})
      .catch( (err: Error) => console.log(err));
    }
  }

  editName(i: number, device: Device): void {
    this.edited = i;
    this.newName = device.name;
  }

  cancelEdit(): void {
    this.edited = null;
  }

  confirmEdit(i: number, device: Device): void {
    console.log(this.newName);
    this.my_deviceService.changeName(device.deviceId, this.newName).then( _device => {
      this.devices[i].name = this.newName;
      this.edited = null;
    });
  }

  isIMEI(control: AbstractControl) {
    const imei: string = control.value;
    if (!imei) {
      return;
    }
    if (imei.length !== 15 ) {
      control.setErrors( {imei: true});
      return { imei: true };
    }
    return null;
  }

  onValueChanged(data?: any) {
    if (!this.registerForm) {
       return;
    }
    const form = this.registerForm;

    for (const field of Object.keys(this.formErrors)) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key of Object.keys(control.errors)) {
          this.formErrors[field] += messages[key];
        }
      }
    }
  }

  public getDateRegistered(_device: Device): string {
    return this.dateToString(_device.date_created);
  }

  public getLastLocationDate(_device: Device): string {
    if (_device.gpsData.length === 0) {
      return 'Never active';
    }
    const _gpsData = _device.gpsData;
    const coords = _gpsData[_gpsData.length - 1].coords;
    return this.dateToString(coords[coords.length - 1].date);
  }

  private dateToString(date): string {
    const options = {
      weekday: 'long', year: 'numeric', month: 'short',
      day: 'numeric', hour: '2-digit', minute: '2-digit'
    };
    return String(new Date(date).toLocaleTimeString('en-us', options));
  }


}
