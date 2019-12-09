import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {API_URL} from '../env';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    alert('failure');
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  // attemptLogin(a): any {
  //   let x = null;
  //   this.http.get(`http://example.com/`).subscribe(data => { x = data}, err => console.error(err), () => console.log('done loading foods'));
  //   console.log('x is ' + JSON.stringify(x))

  //   return this.http.get(`${API_URL}/`);
  // }

  attemptLogin(loginInfo): any {
    return this.http.post(`${API_URL}/login`, loginInfo, {headers: {"Content-Type": "application/json"}});

    // return this.http.post(`${API_URL}/login`, JSON.stringify(loginInfo), {
    //   headers: {"Content-Type": "application/json"}
    // });
  }
}