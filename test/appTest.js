const chai = require('chai');
const assert = chai.assert;
const request = require('supertest');
const app = require('../app.js');
const th = require('./testHelper');

describe('APP', () => {
  describe('get /bad', () => {
    it('should respond with 404', (done) => {
      request(app)
        .get('/bad')
        .expect(404)
        .end(done);
    })
  })
  describe('get /', () => {
    it('serves login page', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .expect(/Login Here/)
        .end(done);
    })
  })
  describe('get /login', () => {
    it('serves login page', (done) => {
      request(app)
        .get('/login')
        .expect(200)
        .expect(/Login Here/)
        .end(done);
    })
  })
  describe('get /home', () => {
    it('should redirect to login page', (done) => {
      request(app)
        .get('/home')
        .expect(302)
        .expect('Location','/login')
        .end(done);
    })
  })
  describe('post /login', () => {
    it('redirects to login page when login credentials are invalid', (done) => {
      app.registered_users=[{userName:'sample'}]
      request(app)
        .post('/login')
        .send('userName=bad')
        .expect(302)
        .expect('Location','/login')
        .end(done);
    })
    it('redirects to home page when login credentials are valid', (done) => {
      app.registered_users=[{userName:'sample'}]
      request(app)
        .post('/login')
        .send('userName=sample')
        .expect(302)
        .expect('Location','/home')
        .end(done);
    })
  })
  describe('get /login', () => {
    it('shows login failed message for invalid credentials', (done) => {
      request(app)
        .get('/login')
        .set('Cookie','logInFailed=true')
        .expect(/Login Failed/)
        .expect(200)
        .expect(th.doesNotHaveCookies)
        .end(done);
    })
  })
  describe('get /logout', () => {
    it('redirects to login page', (done) => {
      request(app)
        .get('/logout')
        .expect(302)
        .expect('Location','/login')
        .end(done);
    })
  })
})
