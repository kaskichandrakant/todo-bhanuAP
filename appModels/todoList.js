const Item = require('./item.js');

class TodoList {
  constructor(title,description) {
    this.title=title;
    this.description=description;
    this.itemId=1;
    this.items={};
  }
  getTitle(){
    return this.title;
  }
  getDescription(){
    return this.description;
  }
  addTask(item){
    this.items[this.itemId]=new Item(item);
    this.itemId++;
  }
  getTask(itemId){
    return this.items[itemId];
  }
  deleteTask(itemId){
    delete this.items[itemId];
  }
  changeTitle(newTitle){
    this.title=newTitle;
  }
  changeDescription(newDescription){
    this.description=newDescription;
  }
  getItems(){
    return this.items;
  }
}

module.exports=TodoList;
