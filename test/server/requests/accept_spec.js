/* global api, describe, it, expect, beforeEach */

const User = require('../../../models/user');
const Bathroom = require('../../../models/bathroom');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const userData = {
  username: 'test',
  email: 'test@test.com',
  password: 'test',
  passwordConfirmation: 'test',
  firstName: 'test',
  lastName: 'tester'
};

const bathroomData = {
  location: { lat: 51.532923, lng: -0.169155 },
  name: 'John Smith',
  address: 'Flat 2, 76a St John\'s Wood High Street, London, NW8 7SH',
  image: 'https://s-media-cache-ak0.pinimg.com/originals/7f/45/d3/7f45d357db0ebb1ca4475a1c20b831ae.jpg',
  description: 'A throne for your throne',
  toilet: true,
  shower: false,
  bidet: true,
  sanitaryProducts: false,
  babyChanging: true
};



let token;
let bathroomId;
let requestId;

describe('PUT /bathrooms/:id/requests/:requestId/accepted', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Bathroom.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });

        bathroomData.requests = [{
          user: user
        }];
      })
      .then(() => Bathroom.create(bathroomData))
      .then(bathroom => {
        bathroomId = bathroom._id;
        requestId = bathroom.requests[0]._id;
      })
      .then(() => done());
  });
  it('should return a bathroom with an array in requests', done => {
    api
      .put(`/api/bathrooms/${bathroomId}/requests/${requestId}/accepted`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body.requests).to.be.a('array');
        done();
      });
  });
  it('the returned request should have a status of accepted', done => {
    api
      .put(`/api/bathrooms/${bathroomId}/requests/${requestId}/accepted`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body.requests[0].status).to.eq('accepted');
        done();
      });
  });
});
