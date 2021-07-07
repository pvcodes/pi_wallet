import os
from dotenv import load_dotenv
import pymongo
from pymongo import MongoClient

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
except Exception as e:
    print(e)

x = db.users.delete_many({})

print(print(x.deleted_count, " documents deleted."))
