let chai = require('chai');
let assert = chai.assert;
let requestSimulator = require('./testFrameWork/requestSimulator.js');
let request = requestSimulator.request;
let createGetOptions = requestSimulator.createGetOptions;
let createPostOptions = requestSimulator.createPostOptions;

process.env.COMMENT_STORE = "./testFrameWork/testStore.json";
let th = require('./testFrameWork/testHelper.js');
let app = require('../app.js');

describe('app', () => {
  describe('GET /bad', () => {
    it('responds with 404', done => {
      let options=createGetOptions("/bad");
      request(app, options, (res) => {
        assert.equal(res.statusCode, 404);
        done();
      })
    })
  })
  describe('GET /', () => {
    it('redirects to home', done => {
      let options=createGetOptions("/");
      request(app, options, (res) => {
        th.should_be_redirected_to(res, '/login');
        assert.equal(res.body, "");
        done();
      })
    })
  })
  describe('GET /home', () => {
    it('gives the home page', done => {
      let options=createGetOptions("/home");
      request(app, options, res => {
        th.should_be_redirected_to(res, '/login');
        done();
      })
    })
  })
  describe('GET /css/master.css', () => {
    let options=createGetOptions("/css/master.css");
    it('serves the image', done => {
      request(app, options, res => {
        th.status_is_ok(res);
        done();
      })
    })
  })
  describe('GET /todo.html', () => {
    let options=createGetOptions("/todo.html");
    it('serves the javascript source', done => {
      request(app, options, res => {
        th.should_be_redirected_to(res, '/login');
        done();
      })
    })
  })
  describe('GET /login', () => {
    let options=createGetOptions("/login");
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
      let headers={"cookie":"message=login failed"}
      let options=createGetOptions("/login",headers);
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
      let body="userName=sampleUser";
      let options=createPostOptions("/login",{},body);
      request(app, options, res => {
        th.should_be_redirected_to(res, '/home');
        th.should_not_have_cookie(res, 'message');
        done();
      })
    })
    it('redirects to login with message for invalid user', done => {
      let body='userName=badUser';
      let options=createPostOptions('/login',body);
      request(app, options, res => {
        th.should_be_redirected_to(res, '/login');
        th.body_does_not_contain(res, 'logInFailed=true');
        done();
      })
    })
  })
  describe.skip('/createNewTodo', () => {
    it('redirects to login page if user is bad user', done => {
      let body='userName=badUser';
      let options=createGetOptions('/createNewTodo',body);
      request(app, options, res => {
        th.should_be_redirected_to(res, '/login');
        th.body_does_not_contain(res, 'logInFailed=true');
        done();
      })
    })
    it('redirects to /todo.html is user is valid user', () => {
      let options=createGetRequest('/createNewTodo');
      request(app, {
        method: 'GET',
        url: "/createNewTodo",
        user: 'sampleUser'
      }, res => {
        th.should_be_redirected_to(res, '/todo.html');
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
