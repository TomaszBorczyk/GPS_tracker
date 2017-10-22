import { Component, Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { LocalStorageService } from 'angular-2-local-storage';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';
// import { StorageService } from  '../services/local-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
@Injectable()
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFailed: boolean;

  formErrors = {
    'username': '',
    'password': ''
  };

  validationMessages = {
    'username': {
      'required': 'Username is required',
    },

    'password': {
      'required': 'Password is required',
    }

  };

  constructor(
      private my_apiService: ApiService,
      private fb: FormBuilder
    ) {
      this.loginFailed = false;
    }

    ngOnInit() {
      this.buildForm();
    }


    buildForm(): void {
    this.loginForm = this.fb.group({
      // 'username': [this.user.username,[
      'username': ['', [
          Validators.required,
        ]
      ],
      // 'password': [this.user.password, [
      'password': ['', [
          Validators.required,
        ]
      ]
    });

    this.loginForm.valueChanges
        .subscribe(
          data => this.onValueChanged(data)
        );

    this.onValueChanged();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username: string = this.loginForm.get('username').value;
      const password: string = this.loginForm.get('password').value;

      this.my_apiService
          .login(username, password)
          .catch( err => {
            this.loginFailed = true;
          });
    }
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) {
       return;
    }
    const form = this.loginForm;

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
