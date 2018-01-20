const fs = require('fs');
const WebApp = require('./webapp');
const TodoContentHandler = require('./dataHandlers/todoContentHandler');
const qs = require('querystring');

const utility = require('./lib/utility.js')
const getContentType = utility.getContentType;
const logRequest = utility.logRequest;
const TodoApp = require('./appModels/todoApp.js');
const todoApp = new TodoApp();
todoApp.addUser('bhanutv', 'Bhanu Teja Verma');
todoApp.addUser('santosh', 'santosh Kaski');
let registered_users = todoApp.getAllUsers();

const toS = utility.toS;
const redirectLoggedInUserToHome = utility.redirectLoggedInUserToHome;
const redirectLoggedOutUserToLogin = utility.redirectLoggedOutUserToLogin;
const serveStaticFile = utility.serveStaticFile;
const decodeString = utility.decodeString;



//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-//

todoContentHandler = new TodoContentHandler();

let loadUser = (req, res) => {
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u => u.sessionid == sessionid);
  if (sessionid && user) {
    req.user = user;
  }
};


let parseItems = (items) => {
  let itemsList=[];
  let objKeys = Object.keys(items);
  objKeys.forEach(element=>{
    if(element.startsWith('item')){
      itemsList.push({task:items[element],status:'added'});
    }
  })
  return itemsList;
}

let respondToData = function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.statusCode = 200;
  let title = req.body.title;
  let description = decodeString(req.body.description);
  let todoItems = req.body.todo;
  let itemsList = parseItems(req.body);
  req.user.addTodo(title, description, itemsList);
  let todo = req.user.getTodo(title)
  todoContentHandler.handleData(req.user, todo);
  res.redirect('/userTodo');
}

let writeTodo = (req, res) => {
  let data = todoContentHandler.getPrevioustodoItem('./data/' + req.user.userName + '.json');
  res.write(data);
  res.end();
}

//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-//

let getHomePage = function(req, res, data) {
  let titleText = getTitles(req.user.userName);
  res.setHeader('Content-type', 'text/html');
  let dataWithUserName = data.replace('user', `${req.user.name}`)
  let dataWithTitle = dataWithUserName.replace(/TODO/, titleText);
  res.write(dataWithTitle);
  res.end();
}

let getTitles = function(userName) {
  let titleText = '';
  let data = todoContentHandler.getAllItems(userName);
  let titles = data.map((ele) => {
    return ele.title
  });
  titles.forEach((title) => {
    titleText += `<a id=${title} onclick=viewTodo(event) >${decodeString(title)}</a><button class="deleteButton" id=delete_${title} onclick=deleteTodo(event)>Delete</button><p id =${title}_items></p>`
  })
  return titleText;
}

let getLogin = (req, res) => {
  if(req.user) {
    res.redirect('./home');
    return;
  }
  res.setHeader('Content-type', 'text/html');
  res.write('<form method="POST"> <input name="userName" value="bhanutv"><input name="place"> <input type="submit"></form>');
  res.end();
};

let postLogin = (req, res) => {
  let user = registered_users.find(u => u.userName == req.body.userName);
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

let getHome = (req, res) => {
  fs.readFile('./public/home.html', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    getHomePage(req, res, data);
  });
};

let getLogout = (req, res) => {
  res.setHeader('Set-Cookie', [`loginFailed=false,Expires=${new Date(1).toUTCString()}`, `sessionid=0,Expires=${new Date(1).toUTCString()}`]);
  delete req.user.sessionid;
  res.redirect('/login');
};

let createNewTodoHandler = (req, res) => {
  res.redirect('/todo.html');
  res.end();
};

let newTodoHandler = (req, res) => {
  respondToData(req, res);
};

let userTodoHandler = (req, res) => {
  writeTodo(req, res);
};

let viewTodoHandler = (req, res) => {
  let todoData = todoContentHandler.getTodoItem(req.user.userName, req.body.todoId);
  res.write(todoData);
  res.end();
};

let deleteTodoHandler = (req, res) => {
  let userName = req.user.userName;
  let id = req.body.todoId;
  let data = todoContentHandler.getAllItems(userName);
  let todo = data.find(e => e.title == id);
  data.splice(data.indexOf(todo), 1);
  todoContentHandler.removeDeletedTodoFromData(userName, data);
  res.end();
}

let deleteTodoItemHandler=(req,res)=>{
  let userName = req.user.userName;
  let titleId = req.body.todoId;
  let todoItemId = req.body.item;
  let data = todoContentHandler.getAllItems(userName);
  let todo=data.find(element=>element.title == titleId);
  let todoList=JSON.parse(todo.todoList);
  let todoItem=todoList.find(element=>element.task==todoItemId);
  todoList.splice(todoList.indexOf(todoItem),1);
  todo.todoList = JSON.stringify(todoList);
  todoContentHandler.removeDeletedTodoFromData(userName,data);
  res.end();
}

//-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-//

let app = WebApp.create();
app.preProcess(logRequest);
app.preProcess(loadUser);
app.preProcess(redirectLoggedInUserToHome);
app.preProcess(redirectLoggedOutUserToLogin);
app.preProcess(serveStaticFile);
app.post('/login', postLogin);
app.get('/login', getLogin);
app.get('/logout', getLogout);
app.get('/home', getHome);
app.post('/viewTodo', viewTodoHandler);
app.post('/newTodo', newTodoHandler);
app.post('/deleteTodo', deleteTodoHandler);
app.get('/userTodo', userTodoHandler);
app.get('/createNewTodo', createNewTodoHandler);
app.post('/deleteItem',deleteTodoItemHandler);

module.exports = app;
