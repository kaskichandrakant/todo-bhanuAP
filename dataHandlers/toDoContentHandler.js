//const fs = require('fs');
const ContentParser = require('./parseContent');
const GetHtmlFormat = require('./htmlConverter');
contentParser = new ContentParser();
htmlConverter = new GetHtmlFormat();

const TodoContentHandler = function(fs) {
  this.fs=fs;
  this.purpose = 'handlesTodoData';
}

TodoContentHandler.prototype = {

  storeData: function(userFile, title, body, todoList) {
    let userTodoList = JSON.parse(this.fs.readFileSync(userFile, 'utf8'));
    let todoContent = contentParser.parseContent(title, body, todoList);
    userTodoList.push(todoContent);
    this.fs.writeFileSync(userFile, JSON.stringify(userTodoList));
    return userTodoList;
  },
  handleData: function(userName,todo) {
    let filePath = this.getFilePath(userName);
    let todoItems=todo.todoItems;
    if (this.fs.existsSync(filePath)) {
      return this.storeData(filePath, todo.title, todo.description, todoItems);
    }
    this.fs.writeFileSync('./data/' + userName + '.json', JSON.stringify([]));
    return this.handleData(userName,todo);
  },
  getAllItems:function(userName) {
    let filePath = this.getFilePath(userName);
    if(this.fs.existsSync(filePath)) {
      return JSON.parse(this.fs.readFileSync(filePath,'utf8'));
    }
    return [];
  },
  getTodoItem:function(userName,title){
    let filePath = this.getFilePath(userName);
    let fileContent=JSON.parse(this.fs.readFileSync(filePath,'utf8'));
    let todo=fileContent.find(element=>{
      return element.title==title;
    })
    return htmlConverter.getHtmlFormat(todo);
  },
  writeManipulatedData(userName,data){
    let filePath = this.getFilePath(userName);
    let fileContent= JSON.stringify(data);
    this.fs.writeFileSync(filePath,fileContent);
    return;
  },
  getFilePath(userName){
    return './data/'+userName+'.json';
  }
}

module.exports = TodoContentHandler;
