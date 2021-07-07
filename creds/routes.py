# import flask
from flask import render_template, redirect, url_for,  session, request
from app import app, FERNET
from .models import AddCred, CredsData, UpdateCred
# from cryptography.fernet import Fernet


@app.route('/dashboard')
def dashboard():
    try:
        if session['_userID']:  # If user is logged in
            print('xvid')
            session['cred_data'] = CredsData(
                FERNET.decrypt(session['_userID']).decode())
            print('\n--------------------------------------------\n')
            # print(x)
            print(type(session['cred_data']))
            print(session['cred_data'])
            print('\n--------------------------------------------\n')

            # if not session['creds_data']:
            #     session['cred_data'] = CredsData(
            #         FERNET.decrypt(session['_userID']).decode())
            # print('\n--------------------------------------------\n')
            # print(type(session['cred_data']))
            # print('\n--------------------------------------------\n')

            print(
                f'\n-------------Logged In {session["_userID"]}------------\n')
            template_obj = {
                'title': 'Dashboard',
                'uname': FERNET.decrypt(session['_userID']).decode(),
                'cred_data': session['cred_data']
            }
            print('--------------TEMPLATE---------------------')
            print(template_obj['cred_data'])
            print(type(template_obj['cred_data']))
            return render_template('creds/dashboard.html', obj=template_obj)
    except Exception as e:
        print(e)

    return redirect(url_for('root'))  # user is not logged in


@app.route('/add_creds', methods=['POST'])
def add_creds():
    u = request.form['cred_uname']
    p = request.form['cred_pswrd']
    s = request.form['cred_url']
    print(u, p, s, sep=' : ')
    AddCred(s, u, p)
    return redirect(url_for('dashboard'))


# CRED_UD -> Credentials update and delete
@app.route('/cred_u', methods=['POST'])
def cred_u():
    # h = request.form['cred_id']
    # # h = request.form.get('hidden_input')
    # print(h)
    # new_creds = {
    #     'cred_uname': request.form['cred_uname'],
    #     'cred_pswrd': request.form['cred_pswrd'],
    #     'cred_url': request.form['cred_url']
    # }

    # print(new_creds)

    # res = UpdateCred(h, new_creds)
    # print(f'\nResult: {res}\n')
    return '<h1 class="title">Currently under process, Go back <a href="/dashboard">Click here</a> :) </h1>'
    # return redirect(url_for('dashboard'))


# @app.route('/cred_ud', methods=['POST'])
# def cred_ud():
#     u = request.form['hidden_input']
#     new_creds = {
#         'new_u': request.form['cred_uname'],
#         'new_p': request.form['cred_pswrd'],
#         'new_s': request.form['cred_url']
#     }

#     print(new_creds)

#     res = UpdateCred(u, new_creds)

#     return redirect(url_for('dashboard'))
