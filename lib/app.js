const fs = require('fs');
const timeStamp = require('../time.js').timeStamp;
const WebApp = require('../webapp');
const TodoContentHandler = require('../dataHandlers/todoContentHandler');
let registered_users = [{userName:'bhanutv',name:'Bhanu Teja Verma'},{userName:'harshab',name:'Harsha Vardhana'},{userName:'p',name:'Mr.p'}];
let toS = o=>JSON.stringify(o,null,2);

//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-//

todoContentHandler = new TodoContentHandler();

let logRequest = (req,res)=>{
  let text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});

  console.log(`${req.method} ${req.url}`);
}

let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};

let redirectLoggedInUserToHome = (req,res)=>{
  if(req.urlIsOneOf(['/','/login']) && req.user) res.redirect('/home');
}

let redirectLoggedOutUserToLogin = (req,res)=>{
  if(req.urlIsOneOf(['/','/home','/logout']) && !req.user) res.redirect('/login');
}

const getContentType = function(fileName) {
  let extension = fileName.substr((fileName.lastIndexOf('.') + 1));
  let contentTypes = {
    'html': 'text/html',
    'txt': 'text/plain',
    'css': 'text/css',
    'gif': 'image/gif',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'ico': 'image/ico',
    'svg': 'image/svg+xml',
    'pdf': 'application/pdf',
    'js': 'application/javascript'
  }
  return contentTypes[extension];
}

const serveStaticFile = function(req,res) {
  if(fs.existsSync('.'+req.url)) {
    if(req.user) {
      res.setHeader('Content-type',getContentType(req.url));
      res.statusCode = 200;
      let fileContent = fs.readFileSync('.'+req.url);
      res.write(fileContent);
      res.end();
    } else res.redirect('/login');
  }
};

let respondToData = function(req,res) {
  res.setHeader('Content-Type','text/html');
  res.statusCode = 200;
  todoContentHandler.handleData(req.user.userName,req.body.title,req.body.description,req.body.todo);
  res.redirect('/userTodo');
}

let writeTodo = (req,res)=>{
  let data=todoContentHandler.getPrevioustodoItem('./data/'+req.user.userName+'.json');
  res.write(data);
  res.end();
}

let app = WebApp.create();
app.preProcess(logRequest);
app.preProcess(loadUser);
app.preProcess(redirectLoggedInUserToHome);
app.preProcess(redirectLoggedOutUserToLogin);
app.preProcess(serveStaticFile);

//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-//

let getHomePage=function(req,res,data){
  res.setHeader('Content-type','text/html');
  data.replace('home',`${req.user.name}`)
  res.write(data);
  res.end();
}


app.get('/login',(req,res)=>{
  if(req.user) {
    res.redirect('./home');
    return;
  }
  res.setHeader('Content-type','text/html');
  res.write('<form method="POST"> <input name="userName"><input name="place"> <input type="submit"></form>');
  res.end();
});

app.post('/login',(req,res)=>{
  let user = registered_users.find(u=>u.userName==req.body.userName);
  if(!user) {
    res.setHeader('Set-Cookie',`logInFailed=true`);
    res.redirect('/login');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('/home');
});

app.get('/home',(req,res)=>{
  if(!req.user) {
    res.redirect('/login');
    return;
  }
  fs.readFile('./public/home.html', 'utf8', (err,data)=>{
    if (err) {
      throw err;
    }
    getHomePage(req,res,data);
    console.log(req.user);
  });
});

app.get('/logout',(req,res)=>{
  res.setHeader('Set-Cookie',[`loginFailed=false,Expires=${new Date(1).toUTCString()}`,`sessionid=0,Expires=${new Date(1).toUTCString()}`]);
  delete req.user.sessionid;
  res.redirect('/login');
});

//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-//

app.get('/createNewTodo',(req,res)=>{
  if(req.user) {
    res.redirect('./public/todo.html');
    res.end();
  } else res.redirect('/login');
});

app.post('/newTodo',(req,res)=>{
  if(req.user)
  respondToData(req,res);
  else res.redirect('/login');
});

app.get('/userTodo',(req,res)=>{
  if(req.user){
    writeTodo(req,res);
  } else res.redirect('/login');
});

//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-//

module.exports = app;
