const router = require('express').Router();
const bathrooms = require('../controller/bathrooms');
const auth = require('../controller/auth');
const users = require('../controller/users');
const secureRoute = require('../lib/secureRoute');


router.route('/bathrooms')
  .get(bathrooms.index)
  .post(secureRoute, bathrooms.create);

router.route('/bathrooms/map')
  .get(bathrooms.indexMap);

router.route('/bathrooms/:id')
  .get(bathrooms.show)
  .put(secureRoute, bathrooms.update)
  .delete(secureRoute, bathrooms.delete);

router.route('/bathrooms/:id/requests')
  .post(secureRoute, bathrooms.requestCreate);

router.post('/register', auth.register);
router.post('/login', auth.login);

router.route('/users')
  .get(secureRoute, users.index);

router.route('/users/:id')
  .get(users.show)
  .put(users.update);

module.exports = router;
