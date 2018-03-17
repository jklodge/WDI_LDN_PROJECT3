const Bathroom = require('../models/bathroom');

function indexRoute(req, res, next){
  Bathroom.find()
    .then(bathrooms => res.json(bathrooms))
    .catch(next);
}

function createRoute(req, res, next) {
  Bathroom.create(req.body)
    .then(bathroom => res.status(201).json(bathroom))
    .catch(next);
}

function showRoute(req, res, next){
  Bathroom.findById(req.params.id)
    .then(bathroom => res.json(bathroom))
    .catch(next);
}

function updateRoute(req, res, next) {
  Bathroom.findById(req.params.id)
    .then(bathroom => Object.assign(bathroom, req.body))
    .then(bathroom => bathroom.save())
    .then(bathroom => res.json(bathroom))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Bathroom.findById(req.params.id)
    .then(bathroom => bathroom.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

function requestCreateRoute(req, res, next){
  Bathroom.findById(req.params.id)
    .then(bathroom => {
      const request = { content: req.body.content };
      bathroom.requests.push(request);
      return bathroom.save();
    })
    .then(bathroom => res.json(bathroom))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  requestCreate: requestCreateRoute
};
