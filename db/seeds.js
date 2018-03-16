const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Bathroom = require('../models/bathroom');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();
  Bathroom.create([{
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
  },
  {
    name: 'Peter Andre',
    address: '19a, Celia Road, Tuffnell Park, N195ET',
    image: 'https://www.plumbworld.co.uk/images/ceramica-forli-space-saving-corner-toilet-product-32518-gallery-fA9a-default-H.jpg',
    description: 'Get your bum in here',
    toilet: true,
    shower: false,
    bidet: false,
    sanitaryProducts: false,
    babyChanging: false,
    location: {
      lat: 51.5441512,
      lng: -0.0986545
    }
  },{
    name: 'Regine Falange',
    address: '19b, Celia Road, Tuffnell Park, N195ET',
    image: 'https://www.plumbworld.co.uk/images/ceramica-forli-space-saving-corner-toilet-product-32518-gallery-fA9a-default-H.jpg',
    description: 'Not as good as 19a',
    toilet: true,
    shower: false,
    bidet: false,
    sanitaryProducts: false,
    babyChanging: false,
    location: {
      lat: 51.5441512,
      lng: -0.0986545
    }
  },{
    name: 'Jess Lodge',
    address: '26, Greencourt Gardens, Croydon, CR07LH',
    image: 'https://www.plumbworld.co.uk/images/ceramica-forli-space-saving-corner-toilet-product-32518-gallery-fA9a-default-H.jpg',
    description: 'Squeaky clean',
    toilet: true,
    shower: true,
    bidet: false,
    sanitaryProducts: false,
    babyChanging: true,
    location: {
      lat: 51.3768823,
      lng: -0.0669004
    }
  }])
    .then(bathrooms => console.log(`${bathrooms.length} bathrooms created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
