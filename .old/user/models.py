from logging import error
from flask import Flask, json, jsonify, request, session
from flask.templating import render_template
from passlib.hash import pbkdf2_sha256
import uuid
from app import db


class User:

    def start_sessions(self, user):
        session['logged_in'] = True
        session['user'] = user
        return jsonify(user), 200

    def signup(self):
        user = {
            '_id': uuid.uuid4().hex,
            'full_name': request.form.get('full_name'),
            'uname': request.form.get('uname'),
            'email': request.form.get('email'),
            'pswrd': pbkdf2_sha256.encrypt(request.form.get('pswrd'))
        }

        # existing username and password
        if db.users.find_one({'uname': user['uname']}):
            return {'error': 'username already exist'}, 400
        if db.users.find_one({'email': user['email']}):
            return {'error': 'email already exist'}, 400

        if db.users.insert_one(user):
            # return jsonify(user), 200
            return self.start_sessions(user)
        return {'error': 'Signup falied'}, 400

    def login(self):
        return 1
