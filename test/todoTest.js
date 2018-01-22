const Todo=require('../appModels/todo.js');
const chai = require('chai');
const assert = chai.assert;

describe('/Todo',()=>{
  it('should take title description and totoItems',()=>{
    let todo=new Todo('title','description',['item1','item2']);
    assert.equal(todo.title,'title');
    assert.equal(todo.description,'description');
    assert.deepEqual(todo.todoItems,['item1','item2']);
  })
})
