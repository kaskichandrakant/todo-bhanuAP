const express = require('express');
const cookieParser = require('cookie-parser');
const Accounts = require('./appModels/accounts.js');
const todoApp = new Accounts();
const fs = require('fs');
let app = express();
todoApp.addAccount('santosh');
todoApp.addAccount('viraj');
app.registered_users = todoApp.getAllAccounts();


//---------------------------------------------

let getFileContent = (fileName) => {
  return fs.readFileSync(`./public/${fileName}`, 'utf8');
}

let logger = (req, res, next) => {
  let text = [
    `${new Date().toLocaleTimeString()}`,
    `${req.method} ${req.url}`,
    `Cookies : ${JSON.stringify(req.cookies)}`
  ].join('\n');
  console.log(text);
  next();
}

let loadUser = (req, res, next) => {
  let sessionid = req.cookies.sessionid;
  let user = app.registered_users.find(u => u.sessionid == sessionid);
  if (sessionid && user) req.user = user;
  next();
}

const getLoginPage = (req, res) => {
  if(req.user){
    res.redirect('/home');
    return;
  }
  let fileContent = getFileContent('login.html');
  if (req.cookies.logInFailed) fileContent = fileContent.replace('Here', 'Failed');
  res.send(fileContent);
}

let setForLogin = (user, res) => {
  let sessionid = new Date().getTime();
  res.set('Set-Cookie', `sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('/home');
}

let setForFailedLogin = (res) => {
  res.set('Set-Cookie', `logInFailed=true; Max-Age=${5}`);
  res.redirect('/login');
  return;
}

let postLogin = (req, res, next) => {
  let user = app.registered_users.find(u => u.userName == req.body.userName);
  if (user) {
    setForLogin(user, res);
  } else setForFailedLogin(res);
}

let getHome = (req,res) => {
  if(!req.user) {
    res.redirect('/login');
    return;
  }
  res.send(getFileContent('home.html'));
}

let getLogout = (req,res) => {
  let sessionid = new Date().getTime();
  res.set('Set-Cookie', `sessionid=${sessionid}; Expires=${new Date(1).toUTCString()}`);
  res.redirect('/login');
}

//----------------------------------------------

app.use(cookieParser());
app.use(logger);
app.use(loadUser);
app.use(express.static('public'));
app.use(express.urlencoded({
  extended: false,
}));

app.get('/', getLoginPage);
app.get('/login', getLoginPage);
app.post('/login', postLogin);
app.get('/home',getHome);
app.get('/logout',getLogout);

module.exports = app;
