class Item {
  constructor(id,task) {
    this.id=id;
    this.task=task;
    this.status=false;
  }
  getTask(){
    return this.task;
  }
  getId(){
    return this.id;
  }
  getStatus(){
    return this.status;
  }
  changeStatus(){
    this.status=(!this.status);
  }
  changeTask(newTask){
    this.task=newTask;
  }
}

module.exports=Item;
