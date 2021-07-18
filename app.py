from cryptography.fernet import Fernet
from flask import Flask, render_template, session, redirect, url_for


# from db import db
import db


app = Flask(__name__)
app.secret_key = 'x782'

FERNET_KEY = Fernet.generate_key()
FERNET = Fernet(FERNET_KEY)


# UserRoutes
import user.routes 
import creds.routes



@app.route('/')
def root():
    print('Hlo')
    try:
        print(session)
        if session['_userID']:
            return redirect(url_for('dashboard'))
    except Exception as e:
        print(e)
    obj = {'title': 'Home'}
    return render_template('home.html', obj=obj)
