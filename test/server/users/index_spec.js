/* global api, describe, it, expect, beforeEach */

const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');
const userData = [{
  username: 'Amir',
  firstName: 'Amir',
  lastName: 'Sohi',
  email: 'amir@sohi.com',
  password: 'password',
  passwordConfirmation: 'password'
},{
  username: 'Jess',
  firstName: 'Jess',
  lastName: 'Lodge',
  email: 'jess@lodge.com',
  password: 'password',
  passwordConfirmation: 'password'
}];

let token;

describe('GET /users', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData[0]))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      })
      .then(() => done());
  });
  it('should return a 401 response without a token', done => {
    api
      .get('/api/users')
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
  it('should return a 200 response with a token', done => {
    api
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('should return an array of user objects', done => {
    api
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.be.a('array');
        done();
      });
  });
  it('should return an array of valid user objects', done => {
    api
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.body.forEach((user, index) => {
          expect(user.name).to.eq(userData[index].name);
          expect(user.email).to.eq(userData[index].email);
        });
        done();
      });
  });
});
