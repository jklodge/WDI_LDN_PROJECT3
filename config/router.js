const router = require('express').Router();
const bathrooms = require('../controller/bathrooms');
const auth = require('../controller/auth');

router.route('/bathrooms')
  .get(bathrooms.index)
  .post(bathrooms.create);


router.route('/bathrooms/:id')
  .get(bathrooms.show)
  .put(bathrooms.update)
  .delete(bathrooms.delete);

router.post('/register', auth.register);
router.post('/login', auth.login);

module.exports = router;
