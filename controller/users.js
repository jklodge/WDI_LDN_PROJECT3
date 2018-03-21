const User = require('../models/user');

function indexRoute(req, res, next){
  User.find()
    .then(users => res.json(users))
    .catch(next);
}

function showRoute(req, res, next){
  User.findById(req.params.id)
    .populate({
      path: 'bathrooms',
      populate: {
        path: 'requests.user'
      }
    })
    .populate('requests')
    .then(user => res.json(user))
    .catch(next);
}

function updateRoute(req, res, next) {
  User.findById(req.params.id)
    .then(user => Object.assign(user, req.body))
    .then(user => user.save())
    .then(user => res.json(user))
    .catch(next);
}

function commentCreateRoute(req, res, next){
  req.body.user = req.currentUser;
  User.findById(req.params.id)
    .then(user => {
      user.comments.push(req.body);
      user.save();
    })
    .then(user => res.json(user))
    .catch(next);
}



module.exports = {
  index: indexRoute,
  show: showRoute,
  update: updateRoute,
  commentCreate: commentCreateRoute
};
