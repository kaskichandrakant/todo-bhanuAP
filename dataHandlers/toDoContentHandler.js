const fs = require('fs');
const ContentParser = require('./parseContent');
contentParser=new ContentParser();

const ToDoContentHandler=function() {
  this.purpose='handlesToDoData';
}

ToDoContentHandler.prototype = {

  storeData:function(userFile,title,body,toDoList) {
    let userToDoList = JSON.parse(fs.readFileSync(userFile,'utf8'));
    let toDoContent = contentParser.parseContent(title,body,toDoList);
    userToDoList.push(toDoContent);
    fs.writeFileSync(userFile, JSON.stringify(userToDoList));
    return userToDoList;
  },

  handleData:function(userName,title,body,toDoList) {
    let userFile = './data/'+userName+'.json';
    if(fs.existsSync(userFile)) {
      return this.storeData(userFile,title,body,toDoList);
    } else {
      fs.writeFileSync('./data/'+userName+'.json',JSON.stringify([]));
      return this.handleData(userName,title,body,toDoList);
    }
  }

}

module.exports = ToDoContentHandler;
