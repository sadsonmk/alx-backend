#!/usr/bin/env python3
"""This is a module for the flask application"""

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    """view for the home page"""
    return render_template("0-index.html")

if __name__ == '__main__':
    app.run(debug=True)
