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

  handleData: function(user,todo) {
    let userFile = './data/' + user.userName + '.json';
    if (fs.existsSync(userFile)) {
      return this.storeData(userFile, todo.title, todo.description, todo.todoItems.join('<br>'));
    }
    fs.writeFileSync('./data/' + user.userName + '.json', JSON.stringify([]));
    return this.handleData(user,todo);
  },

  getPrevioustodoItem: function(filePath) {
    if (fs.existsSync(filePath)) {
      let fileContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      return htmlConverter.getHtmlFormat(fileContent[fileContent.length - 1]);
    }
    return '';
  },
  getAllItems:function(userName) {
    let filePath= './data/'+userName+'.json';
    if(fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath,'utf8'));
    }
    return [];
  },
  getTodoItem:function(userName,title){
    let filePath = './data/'+userName+'.json';
    let fileContent=JSON.parse(fs.readFileSync(filePath,'utf8'));
    let todo=fileContent.find(element=>{
      return element.title==title;
    })
    return htmlConverter.getHtmlFormat(todo);
  },
  removeDeletedTodoFromData:function(userName,data){
    let filePath = './data/'+userName+'.json';
    let fileContent=JSON.stringify(data)
    fs.writeFileSync(filePath,fileContent);
    return;
  }
}

module.exports = TodoContentHandler;
