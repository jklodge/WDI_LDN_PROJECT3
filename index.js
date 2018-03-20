const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');

const router = require('./config/router');
const { dbURI, port } = require('./config/environment');
const app = express();
app.use(express.static(`${__dirname}/public/index.html`));

mongoose.connect(dbURI);
app.use(bodyParser.json());

app.use('/api', router);


app.use(bodyParser.json());
app.use('/api', router);

app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(422).json({ message: 'Unprocessable Entity' });
  }
  res.status(500).json({ message: 'Internal Server Error' });
  next();
});



app.listen(port, () => console.log(`Up and running on port${port}`));

module.exports = app;
