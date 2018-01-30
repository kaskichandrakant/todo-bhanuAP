const express = require('express');
const Accounts = require('./appModels/accounts.js');
const fs = require('fs');
let app=express();
let indexPageData=fs.readFileSync('./public/login.html');
let homePageData=fs.readFileSync('./public/home.html');


let accounts=new Accounts();
accounts.addAccount('santosh');
accounts.addAccount('bhanu');
let registered_users=accounts.getAllAccounts();

//---------------------------------------------

let getIndex=function(req,res){
  res.send(indexPageData);
}

let getHome=function(req,res){
  res.write(homePageData);
  res.end();
}


//----------------------------------------------
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
