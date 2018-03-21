const { secret } = require('../config/environment');
const rp = require('request-promise');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

function facebook(req, res, next) {
  rp({
    method: 'GET',
    url: 'https://graph.facebook.com/v2.12/oauth/access_token',
    qs: {
      client_id: req.body.clientId,
      client_secret: process.env.FACEBOOK_APP_SECRET,
      redirect_uri: req.body.redirectUri,
      code: req.body.code
    },
    json: true
  })
    .then(response => {
      return rp({
        method: 'GET',
        url: 'https://graph.facebook.com/me',
        qs: {
          fields: 'name,email,picture',
          access_token: response.access_token
        },
        json: true
      });
    })
    .then(profile => {
      return User.findOne({
        $or: [{ facebookId: profile.id }, { email: profile.email }]
      })
        .then(user => {
          if(!user) {
            const name = profile.name.split(' ');
            user = new User({
              email: profile.email,
              username: profile.name,
              firstName: name[0],
              lastName: name[1]
            });
          }

          user.facebookId = profile.id;
          return user.save();
        });
    })
    .then(user => {
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
      res.json({ token, message: `Welcome back ${user.username}!`});
    })
    // .then(user => user.json(user))
    .catch(next);
}

module.exports = {
  facebook
};
