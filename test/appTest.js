let chai = require('chai');
let assert = chai.assert;
let User = require('../appModels/user.js');
let TodoApp = require('../appModels/todoApp.js');
let requestSimulator = require('./testFrameWork/requestSimulator.js');
let request = requestSimulator.request;
let createGetOptions = requestSimulator.createGetOptions;
let createPostOptions = requestSimulator.createPostOptions;

let dummyFs = {}

process.env.COMMENT_STORE = "./testFrameWork/testStore.json";
let th = require('./testFrameWork/testHelper.js');
let app = require('../app.js');

describe('app', () => {
  describe('GET /bad', () => {
    it('responds with 404', done => {
      let options = createGetOptions("/bad");
      request(app, options, (res) => {
        assert.equal(res.statusCode, 404);
        done();
      })
    })
  })
  describe('GET /', () => {
    it('redirects to home', done => {
      let options = createGetOptions("/");
      request(app, options, (res) => {
        th.should_be_redirected_to(res, '/login');
        assert.equal(res.body, "");
        done();
      })
    })
  })
  describe('GET /home', () => {
    it('gives the home page', done => {
      let options = createGetOptions("/home");
      request(app, options, res => {
        th.should_be_redirected_to(res, '/login');
        done();
      })
    })
  })
  describe('GET /css/master.css', () => {
    // let options = createGetOptions("/css/master.css");
    // it('serves the image', done => {
    //   request(app, options, res => {
    //     th.status_is_ok(res);
    //     done();
    //   })
    // })
  })
  describe('GET /todo.html', () => {
    let options = createGetOptions("/todo.html");
    it('serves the javascript source', done => {
      request(app, options, res => {
        th.should_be_redirected_to(res, '/login');
        done();
      })
    })
  })
  describe('GET /login', () => {
    let options = createGetOptions("/login");
    it('serves the login page', done => {
      request(app, options, res => {
        th.status_is_ok(res);
        th.body_contains(res, 'submit');
        th.body_does_not_contain(res, 'login failed');
        th.should_not_have_cookie(res, 'message');
        done();
      })
    })
    it('serves the login page with message for a failed login', done => {
      let headers = {
        "cookie": "message=login failed"
      }
      let options = createGetOptions("/login", headers);
      request(app, options, res => {
        th.status_is_ok(res);
        th.body_contains(res, 'submit');
        th.should_not_have_cookie(res, 'message');
        done();
      })
    })
  })
  describe('POST /login', () => {
    it('redirects to home for valid user', done => {
      let body = "userName=sampleUser";
      let options = createPostOptions("/login", {}, body);
      request(app, options, res => {
        th.should_be_redirected_to(res, '/home');
        th.should_not_have_cookie(res, 'message');
        done();
      })
    })
    it('redirects to login with message for invalid user', done => {
      let body = 'userName=badUser';
      let options = createPostOptions('/login', body);
      request(app, options, res => {
        th.should_be_redirected_to(res, '/login');
        th.body_does_not_contain(res, 'logInFailed=true');
        done();
      })
    })
  })
  describe('/createNewTodo', () => {
    it('redirects to login page if user is bad user', done => {
      let body = 'userName=badUser';
      let options = createGetOptions('/createNewTodo', body);
      request(app, options, res => {
        th.should_be_redirected_to(res, '/login');
        th.body_does_not_contain(res, 'logInFailed=true');
        done();
      })
    })
    it('redirects to /todo.html is user is valid user', () => {
      let user = new User("bhanu", "Bhanu T V");
      user.sessionid = 1;
      app.registered_users = [user];

      let headers = {
        "cookie": "sessionid=1"
      }
      let options = createGetOptions('/createNewTodo', headers);
      request(app, options, res => {
        th.should_be_redirected_to(res, '/todo.html');
      })
    })
  })
  describe.skip('/deleteTodo', () => {
    it('should delete the specified todo', () => {
      let user = new User("bhanu", "Bhanu T V");
      app.todoApp = new TodoApp();
      app.registered_users = [user];
      app.todoApp.addUser("bhanu", "Bhanu T V");
      app.todoApp.getUser('bhanu').addTodo("first", "description", []);
      user.sessionid = 1;

      let headers = {
        "cookie": "sessionid=1"
      }
      let body = 'todoId=first';
      let options = createPostOptions('/deleteTodo', headers);
      request(app, options, res => {
        assert.deepEqual(app.todoApp.getUser("bhanu").getTitles(), []);
      })
    })

  })
  describe.skip('/newTodo', () => {
    it('should add the specified todo', () => {
      let user = new User("bhanu", "Bhanu T V");
      user.sessionid = 1;
      app.registered_users = [user];
      app.todoApp = new TodoApp();
      app.todoApp.addUser("bhanu", "Bhanu T V");
      let headers = {
        "cookie": "sessionid=1"
      }
      let body = 'title=first&description=description&item_1=some';
      let options = createPostOptions('/newTodo', headers, body);
      let expected = [{
        task: 'some',
        status: 'added'
      }]
      request(app, options, res => {
        assert.deepEqual(app.todoApp.getUser("bhanu").getTodo('first').todoItems, expected)
      })
    })
  })
  describe.skip('/deleteTodoItem', () => {
    it('should delete the specified todoItem from the specific todo', () => {
      let user = new User("bhanu", "Bhanu T V");
      user.sessionid = 1;
      app.registered_users = [user];
      app.todoApp = new TodoApp();
      // app.todoApp.addUser("bhanu", "Bhanu T V");
      app.todoApp.users.push(user);
      let headers = {
        "cookie": "sessionid=1"
      }
      app.todoApp.getUser('bhanu').addTodo('first','description',[{task:'someThingElse',status:"added"}])
      let body = 'todoId=first&item=someThingElse'
      let options = createPostOptions('/deleteItem',headers,body);
      let expectedTodoList =[{"task": "someThingElse",status:'added'}]
      request(app, options, res => {
        assert.deepEqual(app.todoApp.getUser("bhanu").getTodo('first').todoList, expectedTodoList)
      })
    })
  })
})


// app.get('/createNewTodo', createNewTodoHandler);
// app.get('/login', getLogin);
// app.get('/logout', getLogout);
// app.get('/home', getHome);
// app.post('/login', postLogin);
// app.post('/viewTodo', viewTodoHandler);
// app.post('/newTodo', newTodoHandler);
// app.post('/deleteTodo', deleteTodoHandler);
// app.post('/deleteItem',deleteTodoItemHandler);
// app.post('/doneItem',doneItemHandler);
// app.post('/undoneItem',undoneItem);
