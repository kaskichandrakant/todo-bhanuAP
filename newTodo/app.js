const express = require('express');
const Accounts = require('./appModels/accounts.js');
const fs = require('fs');
const logger = require('morgan');
let app=express();
let indexPageData=fs.readFileSync('./public/login.html');
let homePageData=fs.readFileSync('./public/home.html');
let accounts=new Accounts();
accounts.addAccount('santosh');
accounts.addAccount('bhanu');
let registered_users=accounts.getAllAccounts();
console.log(registered_users);

//---------------------------------------------

let getIndex=function(req,res){
  res.send(indexPageData);
}

let getHome=function(req,res){
  res.write(homePageData);
  res.end();
}

let postLogin = (req, res) => {

  let user = app.registered_users[req.body.userName];
  if (!user) {
    res.setHeader('Set-Cookie', `logInFailed=true`);
    res.redirect('/login');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie', `sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('/home');
};

//----------------------------------------------
app.use(logger());
app.use(express.static('public'));

app.use(express.urlencoded({
  extended : false,
  type:(req) => true
}));

app.get('/',getIndex);
app.get('/login',getIndex);
app.post('/login',postLogin);
app.get('/home',getHome);



module.exports=app;
