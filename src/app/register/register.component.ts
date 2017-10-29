import { Component, Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { LocalStorageService } from 'angular-2-local-storage';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';
// import { StorageService } from  '../services/local-storage.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
@Injectable()
export class RegisterComponent implements OnInit {

  username: string;
  registerForm: FormGroup;

  formErrors = {
    'email': '',
    'password': '',
    'rePassword': '',
  };

  validationMessages = {
    'email': {
      'required': 'Email is required',
      'email': 'Please enter correct email'
    },

    'password': {
      'required': 'Password is required',
      'minlength': 'Password must be at least 5 characters long'

    },

    'rePassword': {
      'required': 'Password confirmation is required',
      'notequal': 'Does not mach'
    }
  };

  constructor(
    private my_apiService: ApiService,
    // private localStorage: LocalStorageService,
    // private ttw_storageService:StorageService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // this.user = new User('', '');
  }

  ngOnInit() {
    this.buildForm();
  }


  // getLocalStorageUser(): string {
  //   return JSON.stringify(this.localStorage.get('user'));
  // }

  buildForm(): void {
  this.registerForm = this.fb.group({
    // 'email': [this.user.email, [
    'email': [, [
        Validators.required,
        Validators.email,
      ]
    ],
    // 'password': [this.user.password, [
    'password': [, [
        Validators.required,
        Validators.minLength(5)
      ]
    ],
    'rePassword': [, [
      Validators.required,
      ]
    ]
  }, {validator: this.areEqual});

  this.registerForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );

  this.onValueChanged();
}

onSubmit() {
  if (this.registerForm.valid) {
    const email = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value;
    this.my_apiService
      .register(email, password)
      .then( success => this.router.navigate(['/login']))
      .catch( error => alert(error));
  }
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

areEqual(ac: AbstractControl) {
  const passwordValue = ac.get('password').value;
  const rePasswordValue = ac.get('rePassword').value;

  if (passwordValue !== rePasswordValue) {
    ac.get('rePassword').setErrors( {notequal: true});
  } else {
    return null;
  }

}


}
