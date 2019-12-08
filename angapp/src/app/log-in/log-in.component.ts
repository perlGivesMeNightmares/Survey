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
  loginRes = '';

  constructor(private loginApi: LoginService) {
  }

  ngOnInit() {
  }

  onSubmit() {
  	this.loginRes = this.loginApi.attemptLogin(this.data);
  }
}
