import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {LoginService} from './log-in-api.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-root',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  data = {};
  createUserPage: boolean = false;
  loginRes: any;
  changeModeText: string = 'Create an account';
  buttonText: string = 'Log In';
  setError: boolean = false;
  errorText: string = '';

  constructor(private loginApi: LoginService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.createUserPage && (this.data['password'] != this.data['password_confirm'])) {
      this.setError = true;
      this.errorText = 'Passwords must match HOOOOOONK';
    }
    else {
      this.setError = false;
    }

  	this.loginApi.attemptLogin(this.data).subscribe(data => { 
      console.log('data is ' + JSON.stringify(data));
      let loginRes = data;
      if (!loginRes.success) {
        this.setError = true;
        this.errorText = loginRes.msg
      }
      else {
        console.log('login success');
      }
    });
    
  }

  changeMode() {
    this.changeModeText = this.createUserPage ? 'Create an account' : 'Log in';
    this.buttonText = this.createUserPage ? 'Log In' : 'Register';
    this.createUserPage = !this.createUserPage;
    this.setError = false;
  }
}
