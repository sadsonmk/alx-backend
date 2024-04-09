#!/usr/bin/env python3
"""This module creates a flask app"""

from flask import Flask, render_template, request, g
from flask_babel import Babel


class Config:
    """configures the language and locale for the app"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


@babel.localeselector
def get_locale() -> str:
    """sets the locale for the app"""
    locale = request.args.get('locale')
    if locale and locale in app.config['LANGUAGES']:
        return locale
    return request.accept_languages.best_match(app.config['LANGUAGES'])


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user(user_id):
    """returns a user dictionary or None if the
        ID cannot be found or if login_as was not passed
    """
    return users.get(int(user_id), None)


@app.before_request
def before_request():
    """uses get_user to find a user if any, and
        set it as a global on flask.g.user
    """
    setattr(g, 'user', get_user(request.args.get('login_as', 0)))


@app.route('/', strict_slashes=False)
def home():
    """returns the home page for the app"""
    return render_template('5-index.html')


if __name__ == '__main__':
    app.run(debug=True)
