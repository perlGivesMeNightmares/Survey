from flask import Flask
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# @app.route("/submit/<form_input>", methods=('POST',))
# def submit_quiz(form_input):
# 	print('route hits')
# 	# TODO: hook up a db driver
# 	return

# @app.route("/test/<form_in>")
# def test(form_in):
# 	print('route hits')
# 	# TODO: hook up a db driver
# 	return 'success: {}'.format(form_in)

# @app.route('/survey_data/<survey_id>')
# def get_survey_data(survey_id):
# 	print('hit new route')
# 	return [{'title': 'Survey Title'}]

# @app.route('/getSurveyInfo', methods=('GET',))
@app.route('/getSurveyInfo')
def get_survey_info():
	survey_info = {
		'title': 'My Blurst Survey',
		'description': 'Test of survey',
		'questions': [1, 2, 3]
	}
	return survey_info
