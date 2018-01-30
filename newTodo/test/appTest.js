const chai = require('chai');
const assert = chai.assert;
const request = require('supertest');
const app = require('../app.js');
let doesNotContain = (pattern)=>{
  return (res)=>{
    let match = res.text.match(pattern);
    if(match) throw new Error(`'${res.text}' contains '${pattern}'`);
  }
};

let doesNotHaveCookies = (res)=>{
  const keys = Object.keys(res.headers);
  let key = keys.find(k=>k.match(/set-cookie/i));
  if(key) throw new Error(`Didnot expect Set-Cookie in header of ${keys}`);
}

describe('app',()=>{
  describe('GET /bad',()=>{
    it('responds with 404',done=>{
      request(app)
        .get('/bad')
        .expect(404)
        .end(done);
    });
  });
  describe('GET /',()=>{
    it('gives the index page',done=>{
      request(app)
        .get('/')
        .expect(200)
        .expect('Content-Type',/html/)
        .expect(/login/)
        .end(done);
    });
  });
  describe('POST ',()=>{
    it('should give login page again if cookies are')
  })
//   describe('GET /index.html',()=>{
//     it('gives the index page',done=>{
//       request(app)
//         .get('/index.html')
//         .expect(200)
//         .expect('Content-Type',/html/)
//         .expect(/Make Your Todo/)
//         .end(done);
//     });
//   });
//
//   describe('GET /login',()=>{
//     it('serves the login page',(done)=>{
//       request(app)
//         .get('/loginPage.html')
//         .expect(200)
//         .expect('Content-Type',/html/)
//         .expect(/userName:/)
//         .expect(doesNotContain(/login failed/))
//         .expect(doesNotHaveCookies)
//         .end(done);
//     });
//   });
//
//   describe('GET /login',()=>{
//     it('serves the login page with message for a failed login',(done)=>{
//       request(app)
//         .get('/loginPage.html')
//         .set('Cookie','message=login failed')
//         .expect(200)
//         .expect('Content-Type',/html/)
//         .expect(/userName:/)
//         .expect(/login failed/)
//         .expect(doesNotHaveCookies)
//         .end(done);
//     });
//   });
//   describe('POST /login',()=>{
//     it('redirects to listTodos for valid user',(done)=>{
//       request(app)
//         .post('/loginPage.html')
//         .send('userName=sulagna')
//         .expect(302)
//         .expect('Location','/listTodos.html')
//         .expect('set-cookie','sessionid=1234')
//         .end(done);
//     });
//     it('redirects to loginPage.html with message for invalid user',(done)=>{
//       request(app)
//         .post('/loginPage.html')
//         .send('userName=badUser')
//         .expect(302)
//         .expect('Location','/loginPage.html')
//         .expect('set-cookie','message=login failed; Max-Age=3')
//         .end(done);
//     });
//   });
//   describe('GET /logout',()=>{
//     beforeEach(()=>{
//       app.sessionManager.createSessionFor('sulagna');
//     })
//     it('redirects to loginPage.html',(done)=>{
//       request(app)
//         .get('/logout')
//         .set('cookie','sessionid=1234')
//         .expect(302)
//         .expect('Location','/loginPage.html')
//         .expect('set-cookie','sessionid=0, Expires=Thu, 01 Jan 1970 00:00:00 GMT')
//         .end(done);
//     });
//   });
});
