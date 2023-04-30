from cryptography.fernet import Fernet
from flask import Flask, render_template, session, redirect, url_for


# from db import db
import db


app = Flask(__name__)
app.secret_key = 'x782'
app.config['TEMPLATES_AUTO_RELOAD']= True

FERNET_KEY = Fernet.generate_key()
FERNET = Fernet(FERNET_KEY)


# UserRoutes
import user.routes 
import creds.routes




@app.route('/')
def root():
    print('Initiated root route')
    try:
        print(session)
        if session['_userID']:
            return redirect(url_for('dashboard'))
    except Exception as e:
        print(e)
    template_obj = {'title': 'Home'}
    return render_template('home.html', obj=template_obj)
