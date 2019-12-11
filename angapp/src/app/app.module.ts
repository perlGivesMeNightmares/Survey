import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';

import {SurveyService} from './customerSurvey/survey-api.service';
import {LoginService} from './log-in/log-in-api.service';
import {SurveyCreatorService} from './surveyCreator/survey-creator/survey-creator-api.service';

import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { SurveyCreatorComponent } from './surveyCreator/survey-creator/survey-creator.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { LoginComponentComponent } from './login-component/login-component.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    SurveyCreatorComponent,
    AdminPageComponent,
    LoginComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [SurveyService, LoginService, SurveyCreatorService],
  bootstrap: [AppComponent]
})
export class AppModule {
}