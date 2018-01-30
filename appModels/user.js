const TodoList = require('./todoList');

class User {
  constructor(userName) {
    this.userName=userName;
    this.todos={};
    this.todoId=1;
  }
  addTodo(title,description){
    this.todos[this.todoId]=new TodoList(title,description);
    this.todoId++;
  }
  getTodo(todoId){
    return this.todos[todoId];
  }
  deleteTodo(todoId){
    let todo=this.getTodo(todoId)
    delete this.todos[todoId];
  }
}

module.exports=User;
