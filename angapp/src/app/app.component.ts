import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {SurveyService} from './customerSurvey/survey-api.service';
import {Survey} from './customerSurvey/survey.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  surveyInfoSub: Subscription;
  surveyInfo: Survey;

  constructor(private surveyInfoApi: SurveyService) {
  }

  ngOnInit() {
    this.surveyInfoSub = this.surveyInfoApi
      .getSurveyInfo()
      .subscribe(res => {
          	this.surveyInfo = res;
        },
        console.error
      );
  }

  ngOnDestroy() {
    this.surveyInfoSub.unsubscribe();
  }
}