from flask import Flask
from flask import request
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from flask_sqlalchemy import SQLAlchemy
from hashlib import sha256
import os
import json

def setup_db(app):
	POSTGRES_URL = os.environ['POSTGRES_URL']
	POSTGRES_USER = os.environ['POSTGRES_USER']
	POSTGRES_PW = os.environ['POSTGRES_PW']
	POSTGRES_DB = os.environ['POSTGRES_DB']

	engine = create_engine('postgresql://{}:{}@{}/{}'.format(POSTGRES_USER, POSTGRES_PW, POSTGRES_URL, POSTGRES_DB))
	# engine = create_engine('postgresql+psycopg2://{}:{}@{}/{}'.format(POSTGRES_USER, POSTGRES_PW, POSTGRES_URL, POSTGRES_DB))
	Session = sessionmaker(bind=engine)
	session = Session()

	# DB_URL = 'postgresql+psycopg2://{user}:{pw}@{url}/{db}'.format(user=POSTGRES_USER, pw=POSTGRES_PW, url=POSTGRES_URL, db=POSTGRES_DB)
	DB_URL = 'postgresql://{user}:{pw}@{url}/{db}'.format(user=POSTGRES_USER, pw=POSTGRES_PW, url=POSTGRES_URL, db=POSTGRES_DB)

	app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
	app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # silence the deprecation warning

	db = SQLAlchemy(app)
	return engine, session, db


def run_query(db, sql_text):
	return db.engine.execute(text(sql_text)).execution_options(autocommit=True)


def build_flask_app():
	app = Flask(__name__)
	CORS(app)
	# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
	app.secret_key = os.environ['durr']

	engine, session, db = setup_db(app)
	conn = engine.connect()
	conn.execute("CREATE TABLE IF NOT EXISTS users(user_id serial PRIMARY KEY, username TEXT UNIQUE NOT NULL, password TEXT UNIQUE NOT NULL);")

	conn.execute("INSERT INTO users (username, password) VALUES ('testuser', 'b822f1cd2dcfc685b47e83e3980289fd5d8e3ff3a82def24d7d1d68bb272eb32') "
		"ON CONFLICT DO NOTHING;")

	# run_query(db, "CREATE TABLE users(user_id serial PRIMARY KEY, username TEXT UNIQUE NOT NULL, password TEXT UNIQUE NOT NULL;")

	# drop_tables(db)

	# def drop_tables(db):
	# 	pass


	# login_manager = LoginManager()
	# login_manager.init_app(app)

	# class User(db.Model):
	#     id = db.Column(db.Integer, primary_key=True)
	#     spotify_id = db.Column(db.String(200), unique=False, nullable=True)
	#     spotify_token = db.Column(db.String(200), unique=False, nullable=True)

	return app, conn

app, db = build_flask_app()


@app.route('/getSurveyInfo', methods=('GET',))
def get_survey_info():
	survey_info = {
		'title': 'My Blurst Survey',
		'description': 'Test of survey',
		'questions': [1, 2, 3]
	}
	return survey_info


@app.route('/test', methods=('GET',))
def test():
	return {'success': True}


@app.route('/login', methods=('POST',))
def login():
	print('request is {}'.format(request.form))
	print("also try {}".format(request.get_json()))
	username = request.get_json()['username']
	password = request.get_json()['password']
	if not (username and password):
		return {'success': False, 'msg': 'Error: must fill out both fields'}
	password = sha256(password.encode()).hexdigest()
	if (any(c in username for c in ('"', "'", ';', '\\'))):
		return {'success': False, 'msg': 'Invalid characters used'}

	user_match = db.execute("SELECT * FROM users WHERE username=%s AND password=%s", username, password).fetchone()
	if not user_match:
		return {'success': False, 'msg': 'Invalid creds'}

	return {'success': True, 'user': user_match['user_id']}

@app.route('/attemptLogin/<login_payload>', methods=('POST',))
def attempt_login(login_payload):
	print("attempting login")
	if 'email' in login_payload and 'password' in login_payload:
		return "success"

# @app.route('/login/login_payload', methods=('POST',))
# def login():
# 	if 'email' in login_payload and 'password' in login_payload:
# 		login_user()

# 	form = LoginForm()
# 	if form.validate_on_submit():
# 		# Login and validate the user.
# 		# user should be an instance of your `User` class
# 		login_user(user)

# 		flask.flash('Logged in successfully.')

# 		next = flask.request.args.get('next')
# 		# is_safe_url should check if the url is safe for redirects.
# 		# See http://flask.pocoo.org/snippets/62/ for an example.
# 		if not is_safe_url(next):
# 			return flask.abort(400)

# 		return flask.redirect(next or flask.url_for('index'))
# 	return flask.render_template('login.html', form=form)


# @login_manager.user_loader
# def load_user(user_id):
#     return User.get(user_id)
