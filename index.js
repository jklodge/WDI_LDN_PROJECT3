const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');

const router = require('./config/router');
const { dbURI, port } = require('./config/environment');
const app = express();

mongoose.connect(dbURI);

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.json());
app.use('/api', router);

app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === 'ValidationError') {
    return res.status(422).json({ message: 'Unprocessable Entity' });
  }
  res.status(500).json({ message: 'Internal Server Error' });
  next();
});



app.listen(port, () => console.log(`Up and running on port${port}`));

module.exports = app;
