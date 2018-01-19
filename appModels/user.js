const Todo = require('./todo.js');

class User {
  constructor(userName,name) {
    this.userName=userName;
    this.name = name;
    this.todos = [];
  }
  addTodo(title, description,todos) {
    this.todos.push(new Todo(title, description,todos));
  }
  getTodo(title) {
    return this.todos.find(element=>element.title==title);
  }
  getTitles(){
    return this.todos.map(function(element){
      return element.title;
    })
  }
}

module.exports=User;
