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
          <p class="data">${this.getTodoListItems(data.todoList)}</p>
    </div></body><html>`
  },
  getTodoListItems: function(data) {
    let htmlData = '';
    let dataList=JSON.parse(data);
    dataList.forEach(ele => {
      htmlData += ele.task+'<br>';
    });
    return htmlData;
  }
}

module.exports = HtmlConverter;
