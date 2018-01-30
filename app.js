const express = require('express');
const Accounts = require('./appModels/accounts.js');
const fs = require('fs');
let app = express();
let indexPageData = fs.readFileSync('./public/login.html');
let homePageData = fs.readFileSync('./public/home.html');


let accounts = new Accounts();
accounts.addAccount('santosh');
accounts.addAccount('bhanu');
let registered_users = accounts.getAllAccounts();

//---------------------------------------------

let redirectToLogin = (req, res) => res.redirect('/login');

let getIndex = (req, res) => res.send(indexPageData);

//----------------------------------------------

app.use(express.static('public'));
app.use(express.urlencoded({
  extended: false,
}));

app.get('/', redirectToLogin);
app.get('/login', getIndex);

module.exports = app;
