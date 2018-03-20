/* global api, describe, it, expect, beforeEach */

const Bathroom = require('../../../models/bathroom');
const User = require('../../../models/user');
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
const updatedData = {
  name: 'John Smithereens',
  address: 'Flat 2, 76a St John\'s Wood High Street, London, NW8 7SH',
  image: 'https://s-media-cache-ak0.pinimg.com/originals/7f/45/d3/7f45d357db0ebb1ca4475a1c20b831ae.jpg',
  description: 'A throne for your throne',
  toilet: true,
  shower: false,
  bidet: true,
  sanitaryProducts: false,
  babyChanging: true,
  location: {
    lat: 50.532923,
    lng: -0.169155
  }
};

let token;
let bathroomId;

describe('PUT /bathrooms/:id', () => {
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

  it('should have changed the data', done => {
    api
      .put(`/api/bathrooms/${bathroomId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedData)
      .end((err, res) => {
        expect(res.body.name).to.eq('John Smithereens');
        expect(res.body.location.lat).to.eq(50.532923);
        done();
      });
  });
  it('should return a 200 response with a token', done => {
    api
      .put(`/api/bathrooms/${bathroomId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('should return a 401 response without a token', done => {
    api
      .put(`/api/bathrooms/${bathroomId}`)
      .send(updatedData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
});
