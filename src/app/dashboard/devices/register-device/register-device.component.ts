import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { DeviceService } from '../../../services/device.service';

import { Device } from '../../../models/device.model';

@Component({
  selector: 'app-register-device',
  templateUrl: './register-device.component.html',
  styleUrls: ['./register-device.component.scss']
})
export class RegisterDeviceComponent implements OnInit {
  @Output() emitEvent = new EventEmitter();
  public registerForm: FormGroup;
  public formErrors = {'imei': ''};
  public validationMessages = {
    'imei': {
      'required': 'IMEI is required',
      'used': 'This IMEI is already registered',
      'imei': ' This is not a correct IMEI number'
    },
  };

  constructor(
    private fb: FormBuilder,
    private my_AuthService: AuthService,
    private my_DeviceService: DeviceService,
  ) {

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
      this.emitEvent.next('hello');
      console.log('submit');
      const newDevice: Device = { deviceId: this.registerForm.get('imei').value };
      this.my_DeviceService
      .registerDevice(newDevice)
      .then( (device: Device) => console.log(device))
      .catch( (err: Error) => console.log(err));
    }
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

}
