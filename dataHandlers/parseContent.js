const querystring = require('querystring');

const ContentParser = function() {
  this.purpose='parsesGivenData';
}

ContentParser.prototype = {
  parseContent: function(title,body,toDoList) {
    return `{title:${title},body:${body},toDoList:${toDoList}}`;
  }
}

module.exports = ContentParser;
