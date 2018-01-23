const fs = require('fs');
const ContentParser = require('./parseContent');
const GetHtmlFormat = require('./htmlConverter');
contentParser = new ContentParser();
htmlConverter = new GetHtmlFormat();

const TodoContentHandler = function() {
  this.purpose = 'handlesTodoData';
}

TodoContentHandler.prototype = {

  storeData: function(userFile, title, body, todoList) {
    let userTodoList = JSON.parse(fs.readFileSync(userFile, 'utf8'));
    let todoContent = contentParser.parseContent(title, body, todoList);
    userTodoList.push(todoContent);
    fs.writeFileSync(userFile, JSON.stringify(userTodoList));
    return userTodoList;
  },
  handleData: function(userName,todo) {
    let filePath = this.getFilePath(userName);
    let todoItems=todo.todoItems;
    if (fs.existsSync(filePath)) {
      return this.storeData(filePath, todo.title, todo.description, todoItems);
    }
    fs.writeFileSync('./data/' + userName + '.json', JSON.stringify([]));
    return this.handleData(userName,todo);
  },
  getAllItems:function(userName) {
    let filePath = this.getFilePath(userName);
    if(fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath,'utf8'));
    }
    return [];
  },
  getTodoItem:function(userName,title){
    let filePath = this.getFilePath(userName);
    let fileContent=JSON.parse(fs.readFileSync(filePath,'utf8'));
    let todo=fileContent.find(element=>{
      return element.title==title;
    })
    return htmlConverter.getHtmlFormat(todo);
  },
  writeManipulatedData(userName,data){
    let filePath = this.getFilePath(userName);
    let fileContent= JSON.stringify(data);
    console.log(fileContent);
    fs.writeFileSync(filePath,fileContent);
    return;
  },
  getFilePath(userName){
    return './data/'+userName+'.json';
  }
}

module.exports = TodoContentHandler;
