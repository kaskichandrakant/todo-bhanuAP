const User = require('./user.js');
class Accounts {
  constructor() {
    this.allAccounts={};
  }
  addAccount(userName){
    this.allAccounts[userName]=new User(userName);
  }
  getAccount(userName){
    return this.allAccounts[userName];
  }
}

module.exports=Accounts;
