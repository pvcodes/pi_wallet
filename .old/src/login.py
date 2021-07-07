from bson.codec_options import TypeRegistry
from dotenv import load_dotenv
import os
import flask
# import json
import pymongo
from pymongo import MongoClient, collection


BASEPATH = os.getcwd()
load_dotenv()

DB_CLUSTER = os.getenv(f'DB_CLUSTER')
DB_NAME = os.getenv(f'DB_NAME')
DB_UNAME = os.getenv(f'DB_UNAME')
DB_PSWRD = os.getenv(f'DB_PSWRD')
db_connstr = f'mongodb+srv://{DB_UNAME}:{DB_PSWRD}@{DB_CLUSTER}.uknti.mongodb.net/{DB_NAME}?retryWrites=true&w=majority'

try:
    client = MongoClient(db_connstr)
    db = client['db_piwallet']
    collection = db['users']
except Exception as e:
    print(e)


def isValidLogin(uname: str, pswrd: str):
    boolOBJ = {'userExist': True, 'validCreds': True}
    # isValidUser = isUserExists(uname)
    # if not isValidUser:
    #     boolOBJ['userExist'] = False
    # elif isValidUser['pswrd'] != pswrd:
    #     boolOBJ['validcreds'] = False
    # return boolOBJ
    userExist = isUserExists(uname)
    if not userExist:
        boolOBJ['userExist'] = False
    else:
        try:
            userOBJ = collection.find({'uname': uname})[0]
            if userOBJ['pswrd'] != pswrd:
                boolOBJ['validCreds'] = False
        except Exception as e:
            print(e)


def isUserExists(uname: str):
    try:
        result = collection.find({'uname': uname})[0]
        if result['uname'] == uname:
            return True
    except Exception as e:
        print(e)
    return False


# Sign UP


def signup(uname: str, pswrd: str):
    boolOBJ = {
        'uname': {
            'validuname': isValidUname(uname),
            'userexist': isUserExists(uname)
        },
        'pswrd':  True,
        'addedtodb': False
    }
    if not (boolOBJ['uname']['validuname'] or boolOBJ['uname']['userexist']):
        return boolOBJ
    boolOBJ['pswrd'] = isValidPswrd(pswrd)
    if not boolOBJ['pswrd']:
        return boolOBJ

    try:
        collection.insert_one({
            'uname': uname,
            'pswrd': pswrd
        })
        boolOBJ['addedtodb'] == True
    except Exception as e:
        print(e)

    return boolOBJ


# Helper Functions
def isValidUname(s: str):
    for i in s:
        if not (ord(i) == 95 or ord(i) == 45 or ord(i) == 46 or (ord(i) > 47 and ord(i) < 58) or (ord(i) > 64 and ord(i) < 91) or (ord(i) > 96 and ord(i) < 123)):
            return False
    return True


def isValidPswrd(p: str):
    validLen = True if len(p) >= 5 else False
    hasLowerCase = False
    hasUpperCase = False
    hasNumber = False
    hasSymbol = False
    for i in p:
        if not hasLowerCase and (ord(i) > 96 and ord(i) < 123):
            hasLowerCase = True
        if not hasUpperCase and (ord(i) > 64 and ord(i) < 91):
            hasUpperCase = True
        if not hasNumber and (ord(i) > 47 and ord(i) < 58):
            hasNumber = True
        if not hasSymbol and ((ord(i) > 32 and ord(i) < 48) or (ord(i) > 57 and ord(i) < 65) or (ord(i) > 90 and ord(i) < 97) or (ord(i) > 122 and ord(i) < 126)):
            hasSymbol = True

    boolOBJ = {
        'validLen': validLen,
        'hasLowerCase': hasLowerCase,
        'hasUpperCase': hasUpperCase,
        'hasNumber': hasNumber,
        'hasSymbol': hasSymbol
    }

    for b in boolOBJ:
        if not boolOBJ[b]:
            return False
    return True


a, b = str(input()), str(input())
signup(a, b)
