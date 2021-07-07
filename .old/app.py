from flask import Flask, jsonify, send_from_directory, render_template, url_for, request, redirect
import os
import pymongo
from pymongo import MongoClient
from dotenv import load_dotenv

# from src.login import isValidLogin


def isValidLogin(uname):
    return 1


PORT = os.environ.get('PORT') or 5057
app = Flask(__name__)
app.static_folder = 'static'
app.secret_key = b'\x1b\x18\x84\xfd\xdep\xf5\xa1\xb5\xb7Bo|\x08\x12\xfd'

# Database
BASEPATH = os.getcwd()
load_dotenv()

DB_CLUSTER = os.getenv(f'DB_CLUSTER')
DB_NAME = os.getenv(f'DB_NAME')
qwerty = 12345

print(
    f'\n--------------------------------------------------------------------------{qwerty}--------------------------------------------------------------------------\n')

DB_UNAME = os.getenv(f'DB_UNAME')
DB_PSWRD = os.getenv(f'DB_PSWRD')
db_connstr = f'mongodb+srv://{DB_UNAME}:{DB_PSWRD}@{DB_CLUSTER}.uknti.mongodb.net/{DB_NAME}?retryWrites=true&w=majority'

try:
    client = MongoClient(db_connstr)
    db = client['db_piwallet']
except Exception as e:
    print(e)


# Routes
from user import routes


@app.route('/', methods=['GET'])
def root():
    return render_template('index.html')


@app.route('/dashboard')
def dashboard():
    name = request.args['name']
    return f'{name}, HVK PASSWORD SAHI HAI'


@app.errorhandler(404)
def not_found(e):
    return render_template('err404.html')


@app.route('/my', methods=['POST'])
def my_pass():
    uname, pswrd = request.form['_uname'], request.form['_pswrd']
    isValid = isValidLogin(uname, pswrd)
    if isValid['userExist'] == False:
        return redirect(url_for('success', name='user does not exist,Sign Up, It\'s free'))
    elif isValid['validcreds'] == False:
        return redirect(url_for('success', name='password is wrong'))
    else:
        return redirect(url_for('success', name='Login Successful'))
    # return redirect(url_for('root'))


if __name__ == "__main__":
    app.run(debug=True)
