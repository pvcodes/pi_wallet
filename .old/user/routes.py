from flask import Flask
from flask import render_template, redirect, url_for
from app import app
from user.models import User


@app.route('/user/signup', methods=['POST'])
def signup():
    x = User().signup()
    if x[1] == 400:
        return render_template('index.html', error=x[0]['error'])

    return redirect('dashboard', user=user)


qwerty = 12345

print(
    f'\n--------------------------------------------------------------------------{qwerty}--------------------------------------------------------------------------\n')
