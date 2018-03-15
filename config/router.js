const router = require('express').Router();
const bathrooms = require('../controller/bathrooms');

router.route('/bathrooms')
  .get(bathrooms.index)
  .post(bathrooms.create);


router.route('/bathrooms/:id')
  .get(bathrooms.show)
  .put(bathrooms.update)
  .delete(bathrooms.delete);

module.exports = router;
