# from flask import Flask
import flask
from flask import render_template, redirect, url_for, request, session
from app import app, FERNET
from .models import Register, Login
# from cryptography.fernet import Fernet

# from flask_session import Session


@app.route('/login', methods=['GET', 'POST'])
def user_login():

    template_obj = {'title': 'Login'}

    print(session)
    try:
        if session['_userID']:
            return redirect(url_for('dashboard'))
    except Exception as e:
        print(e)

    if flask.request.method == 'GET':
        return render_template('user/login.html', obj=template_obj)

    else:  # POST Method
        u = request.form['uname']
        p = request.form['pswrd']
        print(u, p, sep=' : ')
        template_obj['uname'] = u
        template_obj['pswrd'] = p
        template_obj['errormsg'] = ''

        uname_valid, pswrd_valid, has_exception, _userID = Login(u, p)
        if has_exception:
            template_obj['errormsg'] = 'Some error occured, please try later'
        elif not uname_valid:
            template_obj['errormsg'] = 'User does not exist'
        elif not pswrd_valid:
            template_obj['errormsg'] = 'Password is incorrect'

        else:  # Everything is fine, redirect to dashboard with session
            session['_userID'] = _userID  # it will be _id
            print(session)
            return redirect(url_for('dashboard'))

        return render_template('user/login.html', obj=template_obj)


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    try:
        session.pop('_userID')
        session.pop('cred_data')
        print(session)
    except Exception as e:
        print(e)
    return redirect(url_for('root'))


@ app.route('/register', methods=['GET', 'POST'])
def user_register():

    template_obj = {'title': 'Register'}

    try:
        if session['_userID']:
            return redirect(url_for('dashboard'))
    except Exception as e:
        print(e)

    # obj = {'title': 'Register'}
    if flask.request.method == 'GET':
        return render_template('user/register.html', obj=template_obj)

    else:  # POST METHOD, i.e, registration is done here :)

        u = request.form['uname']
        e = request.form['email']
        p = request.form['pswrd']
        print(u, p, sep=' : ')

        template_obj['uname'] = u
        template_obj['email'] = e
        template_obj['pswrd'] = p

        # Checking is username, passoword is valid
        uname_exist, uname_valid, pswrd_valid, email_valid, has_exception, _userID = Register(
            u, e, p)

        if uname_exist:
            template_obj['errormsg'] = 'Username already exist, try another'
        elif has_exception:
            template_obj['errormsg'] = 'Some error occured, please try later'
        elif not uname_valid:
            template_obj['errormsg'] = 'Username\'s length must be atleast 4'
        elif not pswrd_valid:
            template_obj['errormsg'] = 'Password must contain one uppercase, one lowercase, one number, one symbol and length of atleast 6'

        elif not email_valid:
            template_obj['errormsg'] = 'Email is not valid, ex: user@email.com'

        else:  # Everything is fine, i.e, registration is done successfully and redirecting to dashboard
            session['_userID'] = _userID
            print(f'\n{session["_userID"]}\n')
            print('\nRegister -> DASHBOARD\n')
            return redirect(url_for('dashboard'))

        return render_template('user/register.html', obj=template_obj)


qwerty = 12345

print(f'\n------------------{qwerty}------------------\n')
