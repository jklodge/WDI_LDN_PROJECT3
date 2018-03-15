const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');

const router = require('./config/router');
const { dbURI, port } = require('./config/environment');
const app = express();

mongoose.connect(dbURI);

app.use('/api', router, bodyParser.json());



app.use(express.static(`${__dirname}/public`));

app.listen(port, () => console.log(`Up and running on port${port}`));
