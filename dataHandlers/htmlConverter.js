const HtmlConverter = function() {}
const decodeString = require('../lib/utility.js').decodeString;

HtmlConverter.prototype = {
  getHtmlFormat: function(data) {
    return `<html><link rel="stylesheet" href="/css/master.css">
    </head>
    <body><div class="middleColumn">
    <a href="/home">Close This Todo</a>
      <h3> <i>Title :</i> </h3>
          <p class="data">${decodeString(data.title)}</p>
      <h3> <i>Description :</i></h3>
          <p class="data">${data.description}</p>
      <h3> <i>Todo List :</i> </h3>
          ${this.getTodoListItems(data.title,data.todoList)}
    </div></body><html>`
  },
   getTodoListItems: function(title,todoList) {
    let htmlData = '';
    todoList.forEach((element,index)=> {
      htmlData += `<span ${this.getStyleAccordingToStatus(element.status)}><button class="deleteButton" id=doneItem_${title}_${element.task} onclick=doneItem(event)>Done</button>
      <button class="deleteButton" id=undoneItem_${title}_${element.task} onclick=undoneItem(event)>Undone</button>
      <button class="deleteButton" id=editItem_${title}_${element.task} onclick=editItem(event)>Edit</button>
      <button class="deleteButton" id=delete_${title}_${element.task} onclick=deleteItem(event)>Delete</button> ${decodeString(element.task)}</span></br>`;
    });
    return htmlData
  },
  getStyleAccordingToStatus:(status)=>{
    if(status=='done'){
      return 'style="color:green;"'
    }
    return '';
  }
}

module.exports = HtmlConverter;
