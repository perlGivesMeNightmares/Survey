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
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  attemptLogin(loginInfo): any {
    return this.http
      .post(`${API_URL}/login`, JSON.stringify(loginInfo)).pipe(
         catchError(LoginService._handleError)
     );
  }
}