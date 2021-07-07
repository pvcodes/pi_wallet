from db import db
import re
from passlib.hash import pbkdf2_sha256
# from cryptography.fernet import Fernet
from app import FERNET

# FERNET_KEY = Fernet.generate_key()
# FERNET = Fernet(FERNET_KEY)


def isvalid_username(username: str):
    if len(username) > 3 and len(username) < 21:
        return 1
    return 0


def isvalid_password(password: str):
    flag = True
    while True:
        if (len(password) < 5):
            flag = -1
            break
        elif not re.search("[a-z]", password):
            flag = -1
            break
        elif not re.search("[A-Z]", password):
            flag = -1
            break
        elif not re.search("[0-9]", password):
            flag = -1
            break
        elif re.search("\s", password):
            flag = -1
            break
        else:
            return 1

    if flag == -1:
        return 0


def isvalid_email(email: str):
    regex = '[^@]+@[^@]+\.[^@]+'

    if re.search(regex, email):

        return 1
    return 0


def Login(uname, pswrd):
    is_username_valid = False
    is_password_valid = False
    has_exception = False

    try:
        db_user = db.users.find_one({'uname': uname})
        print('\n--------DATABASE--------\n', db_user, sep='\n')
        _userID = None
        if db_user:
            is_username_valid = True
            if pbkdf2_sha256.verify(pswrd, db_user['pswrd']):
                is_password_valid = True
                _userID = FERNET.encrypt(uname.encode())
    except Exception as e:
        print(e)
        # has_exception = 'Some error occured, please try later'
        has_exception = True

    return is_username_valid, is_password_valid, has_exception, _userID

    # def logout():


def Register(uname, email, pswrd):
    is_username_valid = isvalid_username(uname)
    is_password_valid = isvalid_password(pswrd)
    is_email_valid = isvalid_email(email)
    is_username_email_exist = False
    has_exception = False

    print(email, is_email_valid, sep=' : ')

    # Does username already exists in DB
    if db.users.find_one({'$or': [{'uname': uname}, {'email': email}]}):
        is_username_email_exist = True
    _userID = None
    if not is_username_email_exist:
        if is_password_valid and is_username_valid and is_email_valid:
            try:
                # Adding to DB
                db.users.insert_one({
                    '_id':  FERNET.encrypt(uname.encode()),
                    'uname': uname,
                    'email': email,
                    'pswrd': pbkdf2_sha256.hash(pswrd)
                })
                print(
                    f'user: {uname} with password: {pswrd} and email {email} Added successfully')
                _userID = FERNET.encrypt(uname.encode())
                print(f'_userID type: {type(_userID)}')
            except Exception as e:
                print(e)
                has_exception = True

    return is_username_email_exist, is_username_valid, is_password_valid, is_email_valid, has_exception, _userID
