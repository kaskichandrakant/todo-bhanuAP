const chai = require('chai');
const assert = chai.assert;
const request = require('supertest');
const app = require('../app.js');

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
    it('should redirect to login page', (done) => {
      request(app)
        .get('/')
        .expect(302)
        .expect('Location','/login')
        .end(done);
    })
  })
  describe('get /home', () => {
    it('should redirect to login page', (done) => {
      request(app)
        .get('/')
        .expect(302)
        .expect('Location','/login')
        .end(done);
    })
  })
})
