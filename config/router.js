const router = require('express').Router();
const bathrooms = require('../controller/bathrooms');

router.route('/bathrooms')
  .get(bathrooms.index)
  .post(bathrooms.create);

module.exports = router;
