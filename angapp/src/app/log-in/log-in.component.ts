import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {LoginService} from './log-in-api.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'log-in',
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
  isSuccess: boolean = false;

  constructor(private loginApi: LoginService, private route: ActivatedRoute, private router: Router) {
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

    this.loginApi.attemptLogin(this.createUserPage, this.data).subscribe(data => { 
      let loginRes = data;
      if (!loginRes.success) {
        this.setError = true;
        this.errorText = loginRes.msg
        this.isSuccess = false;
      }
      else {
        this.isSuccess = true;
        if (!this.createUserPage) {
          localStorage.setItem('token', loginRes.token);
          this.router.navigate(['/admin']);
        }
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
