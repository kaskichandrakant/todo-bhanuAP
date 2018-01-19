const User = require('./user.js');
class TodoApp {
  constructor() {
    this.users=[];
  }
  addUser(userName,name){
    this.users.push(new User(userName,name));
  }
  getUser(name){
    this.users.find((u)=>u.name==name);
  }
  getAllUsers(){
    return this.users;
  }
}

module.exports=TodoApp;
