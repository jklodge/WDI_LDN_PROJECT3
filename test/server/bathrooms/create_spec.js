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

let token;

describe('POST /bathrooms', () => {
  beforeEach(done => {
    Promise.all([
      User.remove({}),
      Bathroom.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      })
      .then(() => done());
  });

  it('should return a 401 response without a token', done => {
    api
      .post('/api/bathrooms')
      .send(bathroomData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
  it('should return a 201 response with a token', done => {
    api
      .post('/api/bathrooms')
      .set('Authorization', `Bearer ${token}`)
      .send(bathroomData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });
  it('should return a valid bathroom object', done => {
    api
      .post('/api/bathrooms')
      .set('Authorization', `Bearer ${token}`)
      .send(bathroomData)
      .end((err, res) => {
        expect(res.body._id).to.be.a('string');
        expect(res.body.name).to.eq(bathroomData.name);
        expect(res.body.address).to.eq(bathroomData.address);
        expect(res.body.image).to.eq(bathroomData.image);
        expect(res.body.location).to.deep.eq(bathroomData.location);
        done();
      });
  });
});
