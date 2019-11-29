import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {API_URL} from '../env';
import {Survey} from './survey.model';

@Injectable()
export class SurveyService {

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  // GET non-observable
  // getSurveyInfo(): any {
  //   let x = this.http.get(`${API_URL}/getSurveyInfo`);
  //   console.log(JSON.stringify(x));
  //   return x;
  // }

  // GET list of public, future events
  getSurveyInfo(): Observable<any> {
    let x = this.http.get(`${API_URL}/getSurveyInfo`);
    return this.http
      .get(`${API_URL}/getSurveyInfo`).pipe(
         catchError(SurveyService._handleError)
     );
  }
}