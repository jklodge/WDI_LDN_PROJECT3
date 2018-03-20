/* global api, describe, it, expect, beforeEach */

const User = require('../../../models/user');
const userData = {
  username: 'Amir',
  firstName: 'Amir',
  lastName: 'Sohi',
  email: 'amir@sohi.com',
  password: 'password',
  passwordConfirmation: 'password'
};

let userId;

describe('GET /users/:id', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        userId = user.id;
      })
      .then(() => done());
  });
  it('should return a user object', done => {
    api
      .get(`/api/users/${userId}`)
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        done();
      });
  });
  it('should return a user object with an array of bathroom objects', done => {
    api
      .get(`/api/users/${userId}`)
      .end((err, res) => {
        expect(res.body.bathrooms).to.be.a('array');
        done();
      });
  });

});
