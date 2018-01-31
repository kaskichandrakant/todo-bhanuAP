const User = require('./user.js');
class Accounts {
  constructor() {
    this.allAccounts=[];
  }
  addAccount(userName){
    this.allAccounts.push(new User(userName));
  }
  getAccount(userName){
    return this.allAccounts.find(u=>u.userName==userName);
  }
  getAllAccounts(){
    return this.allAccounts;
  }
}

module.exports=Accounts;
