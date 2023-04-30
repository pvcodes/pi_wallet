from weakref import ProxyTypes
from db import db
from flask import session
from app import app, FERNET


def AddCred(cred_url, cred_uname, cred_psword):
    # session[]
    print(f'\n---------------{session}---------------\n')

    cred_obj = {
        'cred_id': FERNET.encrypt(f'{cred_url}{cred_uname}'.encode()),
        'cred_url': cred_url,
        'cred_uname': cred_uname,
        'cred_pswrd': cred_psword
    }

    # if db.users_creds.find()
    try:
        if db.users_creds.find_one({'_id': FERNET.decrypt(session['_userID']).decode()}):
            print('\n--------------------HVK INSERT KARDUGA MEIN---------------------\n')
            print(FERNET.decrypt(session['_userID']).decode())
            print(type(FERNET.decrypt(session['_userID']).decode()))
            db.users_creds.update_one(
                {'_id': FERNET.decrypt(session['_userID']).decode()},
                {'$push': {'creds': cred_obj}}
            )
            # db.users_creds.update_one(
            #     {'_id': 'pvcodes'},
            #     {'$push': {'creds': cred_obj}}
            # )
        else:
            db.users_creds.insert_one({
                '_id': FERNET.decrypt(session['_userID']).decode(),
                'creds': [cred_obj]
            })
    except Exception as e:
        print(e)

    # data = {
    #     '_id': 'realusername',
    #     'creds': [
    #         {
    #             'cred_url': 'www.abc.com',
    #             'cred_uname': 'pvcodes',
    #             'cred_password': 'xxxxxxxxxxxxx'
    #         },
    #         {
    #             'cred_url': 'www.google.com',
    #             'cred_uname': 'pvcodes',
    #             'cred_password': 'xxxxxxxxxxxxx'
    #         }
    #     ]
    # }

    return 'x'


def CredsData(username):
    try:
        cred_data = db.users_creds.find_one(
            {'_id': username})
        if cred_data:
            return cred_data['creds']
    except Exception as e:
        print(e)
    return None


def UpdateCred(old_credID, new_creds):
    print('\n', type(old_credID), old_credID, '\n', sep=" : ")
    # if db.users.find_one
    x = db.users_creds.find_one(
        {'_id': FERNET.decrypt(session['_userID']).decode(),
         'creds.cred_id': old_credID
         })
    if x:
        print(f'\n{x}\n')
    try:
        query = {
            '_id': FERNET.decrypt(session['_userID']).decode(),
            'creds.cred_id': old_credID,
        }
        new_creds['cred_id'] = old_credID
        updateVal = {
            '$set': {
                'creds.$': new_creds
            }
        }
        db.users_creds.update_one(query, updateVal)
        return True
    except Exception as e:
        print(e)
        return None
