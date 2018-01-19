const HtmlConverter=function() {}

HtmlConverter.prototype = {
  getHtmlFormat:function(data) {
    return `<html><link rel="stylesheet" href="./css/master.css"></head>
    <body>
    <div class="middleColumn">
    <a href="/home">home</a>
      <h3> <i>title :</i> </h3>
          <p class="data">${data.title}</p>
      <h3> <i>description :</i></h3>
          <p class="data">${data.description}</p>
      <h3> <i>todo list :</i> </h3>
          <p class="data">${data.todoList}</p>
    </div></body><html>`
  }
}

module.exports = HtmlConverter;
