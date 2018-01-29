const User = require('../appModels/user.js');
const chai = require('chai');
const assert = chai.assert;

describe("#user",()=>{
  describe("#addTodo",()=>{
    it("should add new todo of the user",()=>{
      let user=new User("someone");
      let title="title";
      let description="description";
      user.addTodo(title,description);
      assert.equal(user.todos[0].title,title);
      assert.equal(user.todos[0].description,description);
    })
    it("should add number of todos",()=>{
      let user=new User("someone");
      user.addTodo("title1","description1");
      user.addTodo("title2","description2");
      assert.equal(user.todos[0].title,"title1");
      assert.equal(user.todos[1].title,"title2");
    })
  })
  describe("#getTodo",()=>{
    it("should get the id relative to given todo id",()=>{
      let user=new User("someone");
      user.addTodo("title1","description1");
      user.addTodo("title2","description2");
      assert.equal(user.getTodo(1).title,"title1");
    })
  })
  describe("#deleteTodo",()=>{
    it("should delete the todo corresponding to given id",()=>{
      let user=new User("someone");
      user.addTodo("title1","description1");
      user.addTodo("title2","description2");
      assert.equal(user.todos.length,2);
      user.deleteTodo(1);
      assert.equal(user.todos.length,1);
    })
  })
})
