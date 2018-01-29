const Item = require('./item.js');

class TodoList {
  constructor(id,title,description) {
    this.id=id;
    this.title=title;
    this.description=description;
    this.itemId=1;
    this.items=[];
  }
  getId(){
    return this.id;
  }
  getTitle(){
    return this.title;
  }
  getDescription(){
    return this.description;
  }
  addTask(item){
    this.items.push(new Item(this.itemId,item));
    this.itemId++;
  }
  getTask(itemId){
    return this.items.find((ele)=>{
      return ele.id==itemId
    });
  }
  deleteTask(itemId){
    let item=this.getTask(itemId);
    this.items.splice(this.items.indexOf(item),1);
  }
  changeTitle(newTitle){
    this.title=newTitle;
  }
  changeDescription(newDescription){
    this.description=newDescription;
  }
}

module.exports=TodoList;
