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
const updatedData = {
  username: 'Poomir',
  firstName: 'Poomir',
  lastName: 'Poohi',
  email: 'amir@sohi.com',
  password: 'password',
  passwordConfirmation: 'password'
};

let userId;

describe('PUT /users/:id', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        userId = user.id;
      })
      .then(() => done());
  });
  it('should have changed the data', done => {
    api
      .put(`/api/users/${userId}`)
      .send(updatedData)
      .end((err, res) => {
        expect(res.body.username).to.eq('Poomir');
        expect(res.body.firstName).to.eq('Poomir');
        expect(res.body.lastName).to.eq('Poohi');
        done();
      });
  });
});
