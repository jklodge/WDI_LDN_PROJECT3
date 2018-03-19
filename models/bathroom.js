const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  // content: {type: String, minLength: 2},
  user: {type: mongoose.Schema.ObjectId, ref: 'User'},
  status: {type: String, default: 'pending', enum: ['accepted', 'pending', 'rejected']}
  // dialogue: {type: Array}
}, { timestamps: true });


const bathroomSchema = new mongoose.Schema({
  name: {type: String},
  address: {type: String, required: true},
  image: {type: String, required: true},
  description: {type: String, required: true, maxLength: 500},
  toilet: {type: Boolean},
  shower: {type: Boolean},
  bidet: {type: Boolean},
  sanitaryProducts: {type: Boolean},
  babyChanging: {type: Boolean},
  location: {
    lat: {type: Number},
    lng: {type: Number}
  },
  requests: [requestSchema],
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Bathroom', bathroomSchema);
