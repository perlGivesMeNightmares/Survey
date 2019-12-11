// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-survey-creator',
//   templateUrl: './survey-creator.component.html',
//   styleUrls: ['./survey-creator.component.css']
// })
// export class SurveyCreatorComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, Input, Output, EventEmitter } from "@angular/core";
import {Subscription} from 'rxjs';
import {SurveyCreatorService} from './survey-creator-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as SurveyKo from "survey-knockout";
import * as SurveyCreator from "survey-creator";
import * as widgets from "surveyjs-widgets";

import "inputmask/dist/inputmask/phone-codes/phone.js";

widgets.icheck(SurveyKo);
widgets.select2(SurveyKo);
widgets.inputmask(SurveyKo);
//widgets.jquerybarrating(SurveyKo);
//widgets.jqueryuidatepicker(SurveyKo);
//widgets.nouislider(SurveyKo);
//widgets.select2tagbox(SurveyKo);
//widgets.signaturepad(SurveyKo);
// widgets.sortablejs(SurveyKo);
//widgets.ckeditor(SurveyKo);
widgets.autocomplete(SurveyKo);
// widgets.bootstrapslider(SurveyKo);
//widgets.emotionsratings(SurveyKo);

SurveyCreator.StylesManager.applyTheme("default");

var CkEditor_ModalEditor = {
  afterRender: function(modalEditor, htmlElement) {
    var editor = window["CKEDITOR"].replace(htmlElement);
    editor.on("change", function() {
      modalEditor.editingValue = editor.getData();
    });
    editor.setData(modalEditor.editingValue);
  },
  destroy: function(modalEditor, htmlElement) {
    var instance = window["CKEDITOR"].instances[htmlElement.id];
    if (instance) {
      instance.removeAllListeners();
      window["CKEDITOR"].remove(instance);
    }
  }
};
SurveyCreator.SurveyPropertyModalEditor.registerCustomWidget(
  "html",
  CkEditor_ModalEditor
);

@Component({
  selector: "app-survey-creator",
  template: `
    <div id="surveyCreatorContainer"></div>
  `
})
export class SurveyCreatorComponent {
  surveyCreator: SurveyCreator.SurveyCreator;
  @Input() json: any;
  @Output() surveySaved: EventEmitter<Object> = new EventEmitter();

  constructor(private creatorService: SurveyCreatorService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    SurveyKo.JsonObject.metaData.addProperty(
      "questionbase",
      "popupdescription:text"
    );
    SurveyKo.JsonObject.metaData.addProperty("page", "popupdescription:text");

    let options = {
    	generateValidJSON: true,
    	showOptions: false,
    	showEmbededSurveyTab: false,
    	showJSONEditorTab: false,
    	showTestSurveyTab: false,
    	hideAdvancedSettings: true,
    	showPagesToolbox: false,
    	showPropertyGrid: false,
    	questionTypes: ["text", "checkbox", "radiogroup", "dropdown"]
    };
    this.surveyCreator = new SurveyCreator.SurveyCreator(
      "surveyCreatorContainer",
      options
    );
    this.surveyCreator.text = JSON.stringify(this.json);
    this.surveyCreator.saveSurveyFunc = this.saveMySurvey;
  }

  saveMySurvey = () => {
    console.log(JSON.stringify(this.surveyCreator.text));
    let payload = {surveyJson: this.surveyCreator.text, token: localStorage.getItem('token')};
  	this.creatorService.uploadSurvey(payload).subscribe(data => {
  		if (data.success) {
  			alert('survey saved successfully!');
  			this.router.navigate(['/admin']);
  		}
    });
    // this.surveySaved.emit(JSON.parse(this.surveyCreator.text));
  };
}