

router.route('/bathrooms/:id')
  .put(bathrooms.update)
  .delete(bathrooms.delete);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));
