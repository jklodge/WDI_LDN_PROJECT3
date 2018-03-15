const Bathroom =

require('../models/bathroom');

function indexRoute(req, res, next){
  Bathroom.find()
    .then(bathrooms => res.json(bathrooms))
    .catch(next);
}

function showRoute(req, res, next){
  Bathroom.findById(req.params.id)
    .then(bathroom => res.status(201).json(bathroom))
    .catch(next);
}

function updateRoute(req, res, next) {
  Bathroom.findById(req.params.id)
    .then(bathroom =>
      Object.assign(bathroom, req.body))
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

module.exports = {
  index: indexRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};
