const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const config = require('./config');
const routes = require('./routes');
const mongoose = require('./config/database');
require('dotenv').config();

const app = express();
const server = http.createServer(app);


app.set('secretKey', process.env.SECRET_KEY);

/* Allow CORS */
app.use(cors());

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', routes);

server.listen(config.port, () => {
  console.log('Node server listening on port 3000');
});
