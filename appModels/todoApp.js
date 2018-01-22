const User = require('./user.js');
class TodoApp {
  constructor() {
    this.users=[];
  }
  addUser(userName,name){
    this.users.push(new User(userName,name));
  }
  getUser(userName){
    return this.users.find((u)=>u.userName==userName);
  }
  getAllUsers(){
    return this.users;
  }
}

module.exports=TodoApp;
