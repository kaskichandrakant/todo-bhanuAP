const Item = require('../appModels/item.js');
const chai = require('chai');
const assert = chai.assert;

describe("Item",()=>{
  describe('#getTask()',()=>{
    it("should give the task of the item",()=>{
      const item = new Item("doSomething");
      assert.equal(item.getTask(),"doSomething");
    })
  })
  describe("#getStatus()",()=>{
    it("should get the status of the item",()=>{
      const item = new Item("doSomething");
      assert.isNotOk(item.getStatus());
    })
  })
  describe('#changeStatus()',()=>{
    it("should change the current status",()=>{
      const item = new Item("doSomething");
      assert.isNotOk(item.getStatus());
      item.changeStatus();
      assert.isOk(item.getStatus());
    })
  })
  describe("#changeTask()",()=>{
    it("should change the current task to give task",()=>{
      const item = new Item("doSomething");
      assert.equal(item.getTask(),"doSomething");
      item.changeTask("doAnother");
      assert.equal(item.getTask(),"doAnother");
    })
  })
})
