const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Bathroom = require('../models/bathrooms');

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();


  Bathroom.create([{
    address: '26 Greencourt Gardens, Croydon, CR0 7LH',
    description: 'Squeaky clean',
    location: {
      lat: 51.3768823,
      lng: -0.0669004
    },
    facilities: {
      toilet: true,
      shower: true,
      bidet: false,
      sanitaryProducts: false,
      babyChanging: true
    }
  },
  {
    address: '19a, Celia Road, Tuffnell Park, N195ET',
    image: 'https://www.plumbworld.co.uk/images/ceramica-forli-space-saving-corner-toilet-product-32518-gallery-fA9a-default-H.jpg',
    description: 'Get your bum in here',
    facilities: {
      toilet: true,
      shower: false,
      bidet: false,
      sanitryProducts: false,
      babyChanging: false
    },
    location: {
      lat: 51.5441512,
      lng: -0.0986545
    }
  },{
    address: '19b, Celia Road, Tuffnell Park, N195ET',
    image: 'https://www.plumbworld.co.uk/images/ceramica-forli-space-saving-corner-toilet-product-32518-gallery-fA9a-default-H.jpg',
    description: 'Not as good as 19a',
    facilities: {
      toilet: true,
      shower: false,
      bidet: false,
      sanitryProducts: false,
      babyChanging: false
    },
    location: {
      lat: {type: Number},
      lng: {type: Number}
    }
  }
  ])
    .then(bathrooms => console.log(`${bathrooms.length} bathrooms created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
