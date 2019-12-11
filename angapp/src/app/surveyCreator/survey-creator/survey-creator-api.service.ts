import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {API_URL} from '../../env';

@Injectable()
export class SurveyCreatorService {

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  uploadSurvey(surveyInfo): any {
    return this.http.post(`${API_URL}/upload_survey`, surveyInfo, {headers: {"Content-Type": "application/json"}});
  }

}