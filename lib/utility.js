const timeStamp = require('../time.js').timeStamp;
const fs=require('fs');
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

let redirectLoggedInUserToHome = (req, res) => {
  if (req.urlIsOneOf(['/', '/login']) && req.user) res.redirect('/home');
}

let redirectLoggedOutUserToLogin = (req, res) => {
  if (req.urlIsOneOf(['/', '/home', '/createNewTodo', '/userTodo', '/logout', '/deleteTodo', '/newTodo', '/viewTodo','/todo.html']) && !req.user) res.redirect('/login');
}

const serveStaticFile = function(req, res) {
  if (fs.existsSync('./public' + req.url)) {
    res.setHeader('Content-type', getContentType(req.url));
    res.statusCode = 200;
    let fileContent = fs.readFileSync('./public' + req.url);
    res.write(fileContent);
    res.end();
    return;
    res.redirect('/login');
  }
};

let decodeString=function(string){
  return unescape(string).split('+').join(' ');
}

let findElement=function(data,id,option='title'){
  return data.find(e=>e.option==id);
}

module.exports = {
 toS : toS,
 logRequest : logRequest,
 getContentType : getContentType,
 redirectLoggedInUserToHome : redirectLoggedInUserToHome,
 redirectLoggedOutUserToLogin : redirectLoggedOutUserToLogin,
 serveStaticFile : serveStaticFile,
 decodeString:decodeString,
 findElement:findElement
};
