import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { LogInComponent } from './log-in/log-in.component';
import { SurveyCreatorComponent } from './surveyCreator/survey-creator/survey-creator.component';

const routes: Routes = [
	{path: '', pathMatch: 'full', component: LogInComponent},
  	{path: 'admin', component: AdminPageComponent},
  	{path: 'surveyCreator', component: SurveyCreatorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }