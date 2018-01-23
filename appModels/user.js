const Todo = require('./todo.js');
const TodoContentHandler=require('../dataHandlers/todoContentHandler.js');
let todoContentHandler=new TodoContentHandler();
const ItemHandler = require('../dataHandlers/item_handler.js');
let itemHandler=new ItemHandler(new TodoContentHandler());

class User {
  constructor(userName, name) {
    this.userName = userName;
    this.name = name;
    this.todos = [];
  }
  addTodo(title, description, todos) {
    this.todos.push(new Todo(title, description, todos));
  }
  getTodo(title) {
    return this.todos.find(element => element.title == title);
  }
  getTitles() {
    return this.todos.map(function(element) {
      return element.title;
    })
  }
  removeTodo(userName,body){
    let id = body.todoId;
    let data = todoContentHandler.getAllItems(userName);
    let todo = data.find(e => e.title == id);
    data.splice(data.indexOf(todo), 1);
    this.changeUserData(data);
    todoContentHandler.writeManipulatedData(userName, this.todos);
    return;
  }
  changeUserData(data){
    this.todos=data;
  }
  storeData(user, todo) {
    todoContentHandler.handleData(user.userName, todo);
  }
  changedTodoItem(userName,body,todoList){
    let data=todoContentHandler.getAllItems(userName);
    let todo=data.find(e=>e.title==body.todoId);
    todo.todoList=todoList;
    let replacedData=data.find(element=>element.title==todo.title);
    this.todos=data;
    return;
  }
  deleteTodoItem(userName,body){
    let todoList=itemHandler.getTodoList(userName,body);
    let todoItem=itemHandler.getTodoItem(todoList);
    todoList.splice(todoList.indexOf(todoItem),1);
    this.changedTodoItem(userName,body,todoList);
    todoContentHandler.writeManipulatedData(this.userName,this.todos);
    return;
  }
  doneItem(userName,body){
    let todoList=itemHandler.getTodoList(userName,body);
    let todoItem=itemHandler.getTodoItem(todoList);
    todoItem.status='done';
    this.changedTodoItem(userName,body,todoList);
    todoContentHandler.writeManipulatedData(this.userName,this.todos);
    return;
  }
  undoneItem(userName,body){
    let todoList=itemHandler.getTodoList(userName,body);
    let todoItem=itemHandler.getTodoItem(todoList);
    todoItem.status='undone';
    this.changedTodoItem(userName,body,todoList);
    todoContentHandler.writeManipulatedData(this.userName,this.todos);
    return;
  }
  addTodoItem(req){
    let title=req.body.title;
    let todo=this.todos.find(element=>{return element.title==title});
    //here
    return;
  }
}

module.exports = User;
