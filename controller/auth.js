const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function register(res, req, next){
  User.create(req.body)
    .then(user => {
      const token = jwt.sign({ sub: user._id}, secret, {expiresIn: '6h'});
      res.json({
        message: 'Thank you for registering',
        token
      });
    })
    .catch(next);
}

module.exports = {
  register
};
