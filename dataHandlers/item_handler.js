class ItemHandler {
  constructor(todoContentHandler) {
    this.todoContentHandler = todoContentHandler;
  }
  getTodoList(userName,body) {
    this.createInfo(userName,body);
    let todo = this.data.find(e => e.title == this.titleId);
    this.todo = todo;
    return todo.todoList;
  }
  getTodoItem(todoList) {
    return todoList.find(element => element.task == this.todoItemId);
  }
  createInfo(userName,body) {
    this.userName = userName;
    this.titleId = body.todoId;
    this.todoItemId = body.item;
    this.data = this.todoContentHandler.getAllItems(this.userName);
  }
}

module.exports = ItemHandler;
