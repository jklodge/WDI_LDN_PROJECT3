const Bathroom =

require('../models/bathroom');

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
  update: updateRoute,
  delete: deleteRoute
};
