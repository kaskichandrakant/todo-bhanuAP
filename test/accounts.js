const Accounts = require('../appModels/accounts.js');
const chai = require('chai');
const assert = chai.assert;

describe("#accounts", () => {
  describe("#addAccount", () => {
    it("should add a new account with given user name", () => {
      let accounts = new Accounts();
      let user = "testUser";
      accounts.addAccount(user);
      assert.equal(accounts.getAccount(user).userName, user);
    })
  })
  describe("#getAccount", () => {
    it("should give the account with given user name", () => {
      let accounts = new Accounts();
      let user = "testUser";
      accounts.addAccount(user);
      assert.equal(accounts.getAccount(user).userName, user);
    })
  })
})
