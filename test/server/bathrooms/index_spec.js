/* global api, describe, it, expect, beforeEach */

const Bathroom = require('../../../models/bathroom');

const bathroomData = [{
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
}, {
  name: 'Phil Windsor',
  address: '38 Lawrence Gardens, London, NW7 4JT',
  image: 'https://images.esellerpro.com/2714/I/546/5/81dJWx8VPfL._SL1500_.jpg',
  description: 'Sports + toilets = a dream team',
  toilet: true,
  shower: true,
  bidet: false,
  sanitaryProducts: true,
  babyChanging: false,
  location: {
    lat: 51.625852,
    lng: -0.240041
  }
}];

describe('GET /bathrooms', () => {
  beforeEach(done => {
    Bathroom.remove({})
      .then(() => Bathroom.create(bathroomData))
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api
      .get('/api/bathrooms')
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an array as response body', done => {
    api
      .get('/api/bathrooms')
      .send(bathroomData)
      .end((err, res) => {
        expect(res.body).to.be.a('array');
        done();
      });
  });
  it('should return an array of valid bathroom objects', done => {
    api
      .get('/api/bathrooms')
      .send(bathroomData)
      .end((err, res) => {
        res.body.forEach((bathroom, index) => {
          expect(bathroom.name).to.eq(bathroomData[index].name);
          expect(bathroom.address).to.eq(bathroomData[index].address);
          expect(bathroom.image).to.eq(bathroomData[index].image);
          expect(bathroom.description).to.eq(bathroomData[index].description);
          expect(bathroom.location).to.deep.eq(bathroomData[index].location);
        });
        done();
      });
  });
});
