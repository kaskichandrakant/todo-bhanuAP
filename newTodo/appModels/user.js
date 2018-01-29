const TodoList = require('./todoList');

class User {
  constructor(userName) {
    this.userName=userName;
    this.todos=[];
    this.todoId=1;
  }
  addTodo(title,description){
    this.todos.push(new TodoList(this.todoId,title,description));
    this.todoId++;
  }
  getTodo(todoId){
    return this.todos.find(element=>{
      return element.id==todoId;
    })
  }
  deleteTodo(todoId){
    let todo=this.getTodo(todoId)
    this.todos.splice(this.todos.indexOf(todo),1);
  }
}

module.exports=User;
