const router = require('express').Router();
const bathrooms = require('../controller/bathrooms');
const auth = require('../controller/auth');
const users = require('../controller/users');
const secureRoute = require('../lib/secureRoute');
const oauth = require('../controller/oauth');



router.route('/bathrooms')
  .get(bathrooms.index)
  .post(secureRoute, bathrooms.create);

router.route('/bathrooms/map')
  .get(bathrooms.indexMap);

router.route('/bathrooms/:id')
  .get(bathrooms.show)
  .put(secureRoute, bathrooms.update)
  .delete(secureRoute, bathrooms.delete);

router.route('/bathrooms/:id/comments')
  .post(secureRoute, bathrooms.commentCreate);

router.route('/bathrooms/:id/comments/:commentId')
  .delete(secureRoute, bathrooms.commentDelete);

router.route('/users/:id/comments')
  .post(users.commentCreate);

router.route('/bathrooms/:id/requests/:requestId/accepted')
  .put(secureRoute, bathrooms.requestAccept);


router.route('/bathrooms/:id/requests/:requestId/rejected')
  .put(secureRoute, bathrooms.requestReject);

router.route('/bathrooms/:id/requests')
  .post(secureRoute, bathrooms.requestCreate);

router.post('/register', auth.register);
router.post('/login', auth.login);

router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show)
  .put(users.update);

router.post('/facebook', oauth.facebook);

module.exports = router;
