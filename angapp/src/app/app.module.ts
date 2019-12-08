import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {SurveyService} from './customerSurvey/survey-api.service';
import {LoginService} from './log-in/log-in-api.service';
import { LogInComponent } from './log-in/log-in.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [SurveyService, LoginService],
  bootstrap: [LogInComponent]
})
export class AppModule {
}