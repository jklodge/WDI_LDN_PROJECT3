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
  name: 'John Smith',
  address: 'Flat 2, 76a St John\'s Wood High Street, London, NW8 7SH',
  image: 'https://s-media-cache-ak0.pinimg.com/originals/7f/45/d3/7f45d357db0ebb1ca4475a1c20b831ae.jpg',
  description: 'A throne for your throne',
  toilet: true,
  shower: false,
  bidet: true,
  sanitaryProducts: false,
  babyChanging: true,
  location: {
    lat: 51.532923,
    lng: -0.169155
  }
};

let token;
let bathroomId;

describe('POST /bathrooms/:id/requests', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Bathroom.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });//.sign is a jwt method that creates the token
      })
      .then(() => Bathroom.create(bathroomData))
      .then(bathroom => {
        bathroomId = bathroom._id;

      })
      .then(() => done());
  });
  it('should return a bathroom with an array in requests', done => {
    api
      .post(`/api/bathrooms/${bathroomId}/requests`)
      .set('Authorization', `Bearer ${token}`)
      .send(bathroomData)
      .end((err, res) => {
        expect(res.body.requests).to.be.a('array');
        done();
      });
  });
  it('should have the request status as pending', done => {
    api
      .post(`/api/bathrooms/${bathroomId}/requests`)
      .set('Authorization', `Bearer ${token}`)
      .send(bathroomData)
      .end((err, res) => {
        res.body.requests.forEach(request => {
          expect(request.status).to.eq('pending');
        });
        done();
      });
  });
  it('should return an object for the user in request', done => {
    api
      .post(`/api/bathrooms/${bathroomId}/requests`)
      .set('Authorization', `Bearer ${token}`)
      .send(bathroomData)
      .end((err, res) => {
        res.body.requests.forEach(request => {
          expect(request.user).to.be.a('object');
        });
        done();
      });
  });
});
