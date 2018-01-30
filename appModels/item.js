class Item {
  constructor(task) {
    this.task=task;
    this.status=false;
  }
  getTask(){
    return this.task;
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
