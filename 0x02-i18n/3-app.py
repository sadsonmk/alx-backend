#!/usr/bin/env python3
"""This module creates a flask app"""

from flask import Flask, render_template, request
from flask_babel import Babel, gettext


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
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def home():
    """returns the home page for the app"""
    return render_template('3-index.html', title=gettext('home_title'),
                           header=gettext('home_header'))


if __name__ == '__main__':
    app.run(debug=True)
