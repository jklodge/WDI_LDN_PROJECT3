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
  }])
    .then(bathrooms =>
      console.log(`${bathrooms.length} bathrooms created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
