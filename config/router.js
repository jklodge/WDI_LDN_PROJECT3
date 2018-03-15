<<<<<<< HEAD
const router = require('express').Router();
const bathrooms = require('../controller/bathrooms');

router.route('/bathrooms')
  .get(bathrooms.index)
  .post(bathrooms.create);
=======
>>>>>>> development


router.route('/bathrooms/:id')
  .put(bathrooms.update)
  .delete(bathrooms.delete);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));
