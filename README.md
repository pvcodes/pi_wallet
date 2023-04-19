<h1 align='center'>Pi Wallet</h1>
<p>
Safely store your password with 2 layer encryption. 

Soon, will be deployed.. 
</p>

## Screenshot

  <img src='https://user-images.githubusercontent.com/54075838/124794242-6e9a4c80-df6c-11eb-8f03-cf78f9c6923d.png'>

## Features

- Login and Signup
- Save your Credentials with 2 layer encryption

## How to host locally:

- Clone this repo using `git clone https://github.com/pvcodes/pi_wallet.git`
- `cd pi_wallet`
- Add the tokens in a `.env` file in the project root as follows: (The MongoDB database tokens)

```text
DB_UNAME=<DB_Username>
DB_PSWRD=<DB_Password>
DB_CLUSTER=<DB_Cluster_Name>
DB_NAME=<DB_Name>
```

- Install the `pipenv` via `pip install pipenv` and then run:

```
pipenv install
```

- Enjoy!, also you may do bug-reporting or ask for help by just open an issue on this repo.

## How to contribute

Before contributing, here is some information that might help your **PR (Pull Request)** get merged.

### To contribute changes follow these steps:

**Note**: Make sure you have been assigned the issue to which you are making a PR. If you make PR before being assigned, It will be labeled invalid and closed without merging.

1. Add a upstream link to main branch in your cloned repo

```
git remote add upstream https://github.com/pvcodes/pi_wallet.git
```

2. Keep your cloned repo upto date by pulling from upstream (this will also avoid any merge conflicts while committing new changes)

```
git pull upstream master
```

3. Create your feature branch

```
git checkout -b <feature-name>
```

4. Commit all the changes

```
git commit -am "Meaningful commit message"
```

5. Push the changes for review

```
git push origin <branch-name>
```

6. Create a PR from our repo on Github.

### How to report a bug

Submit an issue on GitHub and add as much information as you can about the bug, with screenshots of inputs to the bot and bot response if possible (if the issue is regarding bugs).

## Stack Used:

- Python3
- Flask
- A bunch of flask modules

<!-- <div align="center">
<a href="docs/LICENSE.md"><img src="https://img.shields.io/github/license/pvcodes/pi_chatter/?style=flat-square" alt="MIT license"></a>
</div> -->

#### Wandering why all the repos are forked from <b>[pvcodes-zz](https://github.com/pvcodes-zz)</b>. Read [here](https://github.com/pvcodes/github-repo-cloner#where-did-the-idea-came-from)