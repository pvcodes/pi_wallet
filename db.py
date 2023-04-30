from dotenv import load_dotenv
import os
from pymongo import MongoClient

BASEPATH = os.getcwd()
load_dotenv()


# DB_CLUSTER = os.environ['DB_CLUSTER'], use this method if you deploy on cloud

DB_CLUSTER = os.getenv('DB_CLUSTER')
DB_NAME = os.getenv('DB_NAME')
DB_UNAME = os.getenv('DB_UNAME')
DB_PSWRD = os.getenv('DB_PSWRD')

print("--------------------------------------------------------------")
print(DB_CLUSTER, DB_NAME, DB_UNAME, DB_PSWRD)
print("--------------------------------------------------------------")

db_connstr = f'mongodb+srv://{DB_UNAME}:{DB_PSWRD}@{DB_CLUSTER}.uknti.mongodb.net/{DB_NAME}?retryWrites=true&w=majority&authSource=admin'

try:
    client = MongoClient(db_connstr)
    db = client[DB_NAME]
except Exception as e:
    db = None
    print(e)
