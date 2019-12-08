from flask import Flask
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from flask_sqlalchemy import SQLAlchemy
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

	# engine, session, db = setup_db(app)
	# conn = engine.connect()
	# conn.execute("CREATE TABLE users(user_id serial PRIMARY KEY, username TEXT UNIQUE NOT NULL, password TEXT UNIQUE NOT NULL;")
	# conn.execute("SELECT * FROM users;").fetchall()

	# run_query(db, "CREATE TABLE users(user_id serial PRIMARY KEY, username TEXT UNIQUE NOT NULL, password TEXT UNIQUE NOT NULL;")
	# x = run_query(db, "SELECT * FROM users;")
	# print(x)

	# drop_tables(db)

	# def drop_tables(db):
	# 	pass


	# login_manager = LoginManager()
	# login_manager.init_app(app)

	app.secret_key = os.environ['durr']

	# class User(db.Model):
	#     id = db.Column(db.Integer, primary_key=True)
	#     spotify_id = db.Column(db.String(200), unique=False, nullable=True)
	#     spotify_token = db.Column(db.String(200), unique=False, nullable=True)

	return app

app = build_flask_app()


@app.route('/getSurveyInfo', methods=('GET',))
def get_survey_info():
	survey_info = {
		'title': 'My Blurst Survey',
		'description': 'Test of survey',
		'questions': [1, 2, 3]
	}
	return survey_info

@app.route('/attemptLogin/<login_payload>', methods=('POST',))
def attempt_login(login_payload):
	print("attempting login")
	if 'email' in login_payload and 'password' in login_payload:
		return "success"

@app.route('/login/login_payload', methods=('POST',))
def login():
	if 'email' in login_payload and 'password' in login_payload:
		login_user()

	form = LoginForm()
	if form.validate_on_submit():
		# Login and validate the user.
		# user should be an instance of your `User` class
		login_user(user)

		flask.flash('Logged in successfully.')

		next = flask.request.args.get('next')
		# is_safe_url should check if the url is safe for redirects.
		# See http://flask.pocoo.org/snippets/62/ for an example.
		if not is_safe_url(next):
			return flask.abort(400)

		return flask.redirect(next or flask.url_for('index'))
	return flask.render_template('login.html', form=form)


# @login_manager.user_loader
# def load_user(user_id):
#     return User.get(user_id)
