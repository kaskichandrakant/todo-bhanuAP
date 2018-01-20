const HtmlConverter = function() {}
const decodeString = require('../lib/utility.js').decodeString;

HtmlConverter.prototype = {
  getHtmlFormat: function(data) {
    return `<html><link rel="stylesheet" href="/css/master.css"></head>
    <body><div class="middleColumn">
    <a href="/home">Close This Todo</a>
      <h3> <i>title :</i> </h3>
          <p class="data">${decodeString(data.title)}</p>
      <h3> <i>description :</i></h3>
          <p class="data">${data.description}</p>
      <h3> <i>todo list :</i> </h3>
          ${this.getTodoListItems(data.title,data.todoList)}
    </div></body><html>`
  },
  getTodoListItems: function(title,todoList) {
    let htmlData = '';
    let dataList=JSON.parse(todoList);
    dataList.forEach((element,index)=> {
      htmlData += `<button class="deleteButton" id=delete_${title}_${element.task} onclick=deleteItem(event)>Delete</button>${decodeString(element.task)}</br>`;
    });
    return htmlData;
  }
}

module.exports = HtmlConverter;
