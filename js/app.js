const fs = require('fs');
const timeStamp = require('../time.js').timeStamp;
const WebApp = require('../webapp');
const File = require('../js/file');
let registered_users = [{userName:'bhanutv',name:'Bhanu Teja Verma'},{userName:'harshab',name:'Harsha Vardhana'}];
let toS = o=>JSON.stringify(o,null,2);

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

let respondToFile = (req,res)=>{
  let data = fs.readFileSync('.'+req.url);
  res.setHeader('Content-Type',getContentType(req.url));
  res.statusCode = 200;
  res.write(data);
  res.end();return;
}

let getLastToDoItem = function(data) {
  data = data.substring(0,data.length -1)
  data = data.split(';');
  return data[data.length-1].split('&').join('\n');
}

let writeToDo = (req,res)=>{
  let toDoFileData = unescape(fs.readFileSync('./data/'+req.user.userName+'.txt'));
  res.write(unescape(getLastToDoItem(toDoFileData).split('+').join(' ')));
  res.end();
}

let respondToData = function(req,res) {
  res.setHeader('Content-Type',getContentType(req.url));
  res.statusCode = 200;
  fs.writeFile('./data/'+req.user.userName+'.txt',fs.readFileSync('./data/'+req.user.userName+'.txt')+req.body.title+'&'+req.body.description+'&'+req.body.toDo+';', function(err) {
    if (err) throw err;
  console.log('new toDo is saved!');
  });
  res.redirect('/getMyToDo');
}

let app = WebApp.create();
app.preProcess(logRequest);
app.preProcess(loadUser);
app.preProcess(redirectLoggedInUserToHome);
app.preProcess(redirectLoggedOutUserToLogin);

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
  fs.readFile('./index.html', 'utf8', (err,data)=>{
    if (err) {
      throw err;
    }
    res.setHeader('Content-type','text/html');
    data = data.replace('home',`${req.user.name}`)
    res.write(data);
    res.end();
  });
});

app.get('/public/toDoPage.html',(req,res)=>{
  if(req.user)
    respondToFile(req,res);
  else res.redirect('/login');
})

app.get('/createNewToDo',(req,res)=>{
  if(req.user)
  res.redirect('/public/toDoPage.html');
  else res.redirect('/login');
})

app.get('/css/master.css',(req,res)=>{
  if(req.user)
    respondToFile(req,res);
  else res.redirect('/login');
})

app.post('/server.js',(req,res)=>{
  if(req.user)
  respondToData(req,res);
  else res.redirect('/login');
})

app.get('/getMyToDo',(req,res)=>{
  if(req.user)
  writeToDo(req,res);
  else res.redirect('/login');
})

app.get('/logout',(req,res)=>{
  res.setHeader('Set-Cookie',[`loginFailed=false,Expires=${new Date(1).toUTCString()}`,`sessionid=0,Expires=${new Date(1).toUTCString()}`]);
  delete req.user.sessionid;
  res.redirect('/login');
});

module.exports = app;
