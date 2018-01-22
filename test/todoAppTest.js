const TodoApp=require('../appModels/todoApp.js');
const User=require('../appModels/user.js');
const chai = require('chai');
const assert = chai.assert;

describe('/TodoApp',()=>{
  describe('/getUser',()=>{
    it('should get the user with the refference user name',()=>{
      let todoApp=new TodoApp();
      todoApp.addUser('testUser1','test user1');
      todoApp.addUser('testUser2','test user2');
      assert.equal(todoApp.getUser('testUser1').userName,'testUser1');
      assert.equal(todoApp.getUser('testUser2').userName,'testUser2');
    })
    it('should get undefined if the user is not defined',()=>{
      let todoApp=new TodoApp();
      assert.equal(todoApp.getUser('testUser1'),undefined);
    })
  })
  describe('/addUser',()=>{
    it('should add user with userName and user',()=>{
      let todoApp=new TodoApp();
      todoApp.addUser('testUser','test user');
      assert.equal(todoApp.getUser('testUser').userName,'testUser');
      assert.equal(todoApp.users.length,1);
    });
  })
  describe('/getAllUsers',()=>{
    it('should get all users registered in the app',()=>{
      let todoApp=new TodoApp();
      todoApp.addUser('testUser1','test user1');
      todoApp.getUser('')
      assert.equal(todoApp.getAllUsers()[0].userName,'testUser1');
      assert.equal(todoApp.getAllUsers()[0].name,'test user1');
    })
  })
})
