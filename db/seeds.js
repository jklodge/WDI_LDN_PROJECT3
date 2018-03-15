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
    facilities: {
      toilet: true,
      shower: false,
      bidet: true,
      sanitryProducts: false,
      babyChanging: true
    },
    location: {
      lat: 51.532923,
      lng: -0.169155
    }
  }, {
    name: 'Phil Windsor',
    address: '38 Lawrence Gardens, London, NW7 4JT',
    image: 'https://images.esellerpro.com/2714/I/546/5/81dJWx8VPfL._SL1500_.jpg',
    description: 'Sports + toilets = a dream team',
    facilities: {
      toilet: true,
      shower: true,
      bidet: false,
      sanitryProducts: true,
      babyChanging: false
    },
    location: {
      lat: 51.625852,
      lng: -0.240041
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
  }]);
});
