let chai = require('chai');
let assert = chai.assert;
let request = require('./testFrameWork/requestSimulator.js');
process.env.COMMENT_STORE = "./testFrameWork/testStore.json";
let th = require('./testFrameWork/testHelper.js');
let app = require('../app.js');

describe('app',()=>{
  describe('GET /bad',()=>{
    it('responds with 404',done=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        assert.equal(res.statusCode,404);
        done();
      })
    })
  })
  describe('GET /',()=>{
    it('redirects to home',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.should_be_redirected_to(res,'/login');
        assert.equal(res.body,"");
        done();
      })
    })
  })
  describe('GET /home',()=>{
    it('gives the home page',done=>{
      request(app,{method:'GET',url:'/home'},res=>{
        th.should_be_redirected_to(res,'/login');
        done();
      })
    })
  })
  describe('GET /css/master.css',()=>{
    it('serves the image',done=>{
      request(app,{method:'GET',url:'/css/master.css'},res=>{
        th.status_is_ok(res);
        done();
      })
    })
  })
  describe('GET /todo.html',()=>{
    it('serves the javascript source',done=>{
      request(app,{method:'GET',url:'/todo.html'},res=>{
        th.should_be_redirected_to(res,'/login');
        done();
      })
    })
  })
  describe('GET /login',()=>{
    it('serves the login page',done=>{
      request(app,{method:'GET',url:'/login'},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'submit');
        th.body_does_not_contain(res,'login failed');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
    it('serves the login page with message for a failed login',done=>{
      request(app,{method:'GET',url:'/login',headers:{'cookie':'message=login failed'}},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'submit');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
  })
  describe('POST /login',()=>{
    it('redirects to home for valid user',done=>{
      request(app,{method:'POST',url:'/login',body:'userName=bhanutv'},res=>{
        th.should_be_redirected_to(res,'/home');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
    it('redirects to login with message for invalid user',done=>{
      request(app,{method:'POST',url:'/login',body:'userName=badUser'},res=>{
        th.should_be_redirected_to(res,'/login');
        th.body_does_not_contain(res,'logInFailed=true');
        done();
      })
    })
  })
  describe('/createNewTodo',()=>{
    it('redirects to login page if user is bad user',done=>{
      request(app,{method:'GET',url:'/createNewTodo',body:'userName=badUser'},res=>{
        th.should_be_redirected_to(res,'/login');
        th.body_does_not_contain(res,'logInFailed=true');
        done();
      })
    })
  })
  describe('/createNewTodo',()=>{
    it('redirects to /todo.html is user is valid user',()=>{
      request(app,{method:'GET',url: "/createNewTodo",user:'bhanutv'},res=>{
        th.should_be_redirected_to(res,'/todo.html');
      })
    })
  })

})
