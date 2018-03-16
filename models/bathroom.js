const mongoose = require('mongoose');

const bathroomSchema = new mongoose.Schema({
  name: {type: String},
  address: {type: String, required: true},
  image: {type: String, required: true},
  description: {type: String, required: true, maxLength: 500},
  facilities: {
    toilet: {type: Boolean},
    shower: {type: Boolean},
    bidet: {type: Boolean},
    sanitaryProducts: {type: Boolean},
    babyChanging: {type: Boolean}
  },
  location: {
    lat: {type: Number},
    lng: {type: Number}
  }
});

module.exports = mongoose.model('Bathroom', bathroomSchema);
