const chai = require('chai');
const assert = chai.assert;
const User=require('../appModels/user.js');

describe('#User',()=>{
  describe('/addTodo',()=>{
    it('should add todo to user todos',()=>{
      let user = new User('testUser','test user');
      user.addTodo('title','description',['items']);
      assert.equal(user.todos[0].title,'title');
      assert.equal(user.todos[0].description,'description');
    })
  })
  describe('/getTodo',()=>{
    it('should get the todo with respective title',()=>{
      let user1 = new User('testUser1','test user1');
      let user2 = new User('testUser2','test user2');
      user1.addTodo('title','description',['items']);
      let expected ={
      title: 'title',
      description: 'description',
      todoItems: [ 'items' ] }
      assert.equal(user1.getTodo('title').title,expected.title);
    })
  })
  describe('/getTitles',()=>{
    it('should get the todo with respective title',()=>{
      let user1 = new User('testUser1','test user1');
      user1.addTodo('title1','description1',['items']);
      user1.addTodo('title2','description2',['items']);
      assert.deepEqual(user1.getTitles(),['title1','title2']);
    })
  })
  describe('/changeUserData',()=>{
    it('should replace user todoData with given data',()=>{
      let user = new User('testUser1','test user');
      user.addTodo('title1','description1',['items']);
      let data={title:'changedTitle',description:'changedDescription',todoItems:['changedItems']};
      user.changeUserData(data);
      assert.deepEqual(user.todos,data);
    })
  })
  describe('/deleteTodoItem',()=>{
    it('should delete todo item from the specific todo',()=>{
      let user = new User('testUser1','test user');
      user.addTodo('title1','description1',['items']);
      let data={title:'changedTitle',description:'changedDescription',todoItems:['changedItems']};
      user.changeUserData(data);
      assert.deepEqual(user.todos,data);
    })
  })
})
