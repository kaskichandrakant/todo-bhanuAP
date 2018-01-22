class ItemHandler {
  constructor(todoContentHandler) {
    this.todoContentHandler = todoContentHandler;
  }
  getTodoList(req) {
    this.createInfo(req);
    let todo = this.data.find(e => e.title == this.titleId);
    this.todo = todo;
    return todo.todoList;
  }
  getTodoItem(todoList) {
    return todoList.find(element => element.task == this.todoItemId);
  }
  createInfo(req) {
    this.userName = req.user.userName;
    this.titleId = req.body.todoId;
    this.todoItemId = req.body.item;
    this.data = this.todoContentHandler.getAllItems(this.userName);
  }
}

module.exports = ItemHandler;
