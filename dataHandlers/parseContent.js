const querystring = require('querystring');

const ContentParser = function() {
  this.purpose='parsesGivenData';
}

ContentParser.prototype = {
  parseContent: function(title,description,todoList) {
    return {title:title,description:description,todoList:todoList};
  }
}

module.exports = ContentParser;
