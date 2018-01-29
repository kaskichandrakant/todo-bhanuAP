const TodoList = require('../appModels/todoList.js');
const chai = require('chai');
const assert = chai.assert;

describe("#todoList",()=>{
  describe("#getId",()=>{
    it("should get the id of the todo",()=>{
      const todoList = new TodoList(1,'title','description');
      assert.equal(todoList.getId(),1);
    })
  })
  describe("#getTitle",()=>{
    it("should get the title of the todo",()=>{
      const todoList = new TodoList(1,'title','description');
      assert.equal(todoList.getTitle(),"title");
    })
  })
  describe("#getDescription",()=>{
    it("should get the description of the todo",()=>{
      const todoList = new TodoList(1,'title','description');
      assert.equal(todoList.getDescription(),"description");
    })
  })
  describe("#addTask",()=>{
    it("should add a item in the items list",()=>{
      const todoList = new TodoList(1,'title','description');
      let item = "do somethig at 10 A.M";
      todoList.addTask(item);
      assert.equal(todoList.items[0].task,item);
    })
  })
  describe("#getItems",()=>{
    it("should get all items of the todo",()=>{
      const todoList = new TodoList(1,'title','description');
      let task1="do somethig at 10 A.M";
      todoList.addTask(task1);
      todoList.addTask("do another at 11 A.M");
      assert.equal(todoList.getTask(1).task,task1);
    })
  })
  describe("#deleteTask",()=>{
    it("should delete the item of the given id",()=>{
      const todoList = new TodoList(1,'title','description');
      let task1="do somethig at 10 A.M";
      let task2="do another at 11 A.M";
      todoList.addTask(task1);
      todoList.addTask(task2);
      assert.equal(todoList.items.length,2);
      todoList.deleteTask(2);
      assert.equal(todoList.items.length,1);
    })
  })
  describe("#changeTitle",()=>{
    it("should replace the todo tile with given title",()=>{
      const todoList = new TodoList(1,'title','description');
      assert.equal(todoList.getTitle(),"title");
      todoList.changeTitle("anotherTitle");
      assert.equal(todoList.getTitle(),"anotherTitle");
    })
  })
  describe("#changeDescription",()=>{
    it("should replace the todo tile with given title",()=>{
      const todoList = new TodoList(1,'title','description');
      assert.equal(todoList.getDescription(),"description");
      todoList.changeDescription("newDescription");
      assert.equal(todoList.getDescription(),"newDescription");
    })
  })
})
