import dotenv
from dotenv import load_dotenv
import os
from pymongo import MongoClient

BASEPATH = os.getcwd()
load_dotenv()

# DB_CLUSTER = os.getenv(f'DB_CLUSTER')
DB_CLUSTER = os.environ['DB_CLUSTER']
DB_NAME = os. environ['DB_NAME']
DB_UNAME = os.environ['DB_UNAME']
DB_PSWRD = os.environ['DB_PSWRD']

db_connstr = f'mongodb+srv://{DB_UNAME}:{DB_PSWRD}@{DB_CLUSTER}.uknti.mongodb.net/{DB_NAME}?retryWrites=true&w=majority'

try:
    client = MongoClient(db_connstr)
    db = client['db_piwallet']
except Exception as e:
    db = None
    print(e)

# cred_obj = {
#     'cred_url': 'a',
#     'cred_uname': 'b',
#     'cred_password': 'c'
# }

# Delete creds
db.users_creds.update_one(
    {'_id': 'gaya'},
    {'$pull': {'creds': {'cred_url': 'https://a'}}}
)

# https://a

# Remove all creds
# db.users_creds.delete_many({})
# b'gAAAAABg3_Kb_rjFmPuyp8g5JczzM_du7C-2X4mLf0o_oNlKNVdMttkgwh4zUPuWxQOF7rFBVd1dp5MCUAzE8nIj6hyDB07aMrJPB4d7mKfsGhQTUcBrIJM='

# new_Creds = {
#     'cred_url': "updated",
#     'cred_uname': "updates",
#     'cred_pswrd': "update"
# }

# query = {
#     '_id': 'pvcodes',
#     'creds.cred_id': b'gAAAAABg3_Kb_rjFmPuyp8g5JczzM_du7C-2X4mLf0o_oNlKNVdMttkgwh4zUPuWxQOF7rFBVd1dp5MCUAzE8nIj6hyDB07aMrJPB4d7mKfsGhQTUcBrIJM='
# }
# upateDoc = {
#     '$set': {
#         'creds.$': new_Creds
#     }
# }
# db.users_creds.update_one(query, upateDoc)
