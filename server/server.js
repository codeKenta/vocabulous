'use strict';
require('dotenv').config();
const express = require('express');
const server = express();
const mongoose = require('mongoose');
const db = mongoose.connection;
const path = require('path');
const bodyParser = require('body-parser');
const api = require('./api');

const port = process.env.PORT || '3005';
server.set('port', port);

// Database
mongoose.connect(process.env.DB_CONNECTION_STRING);
mongoose.set('useCreateIndex', true);
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('* DB CONNECTED *');
});

// Body-parser
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// PROBABLY UNNECESSARY

server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

server.use(express.static(path.join(__dirname, '../client/build')));

// Routes
server.use('/api', api);

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const startLog =
  '\n+++++++++++++++++++++++++++++++++++++++++++++++++++\n' +
  '+++++++++++++++++++ NODE SERVER +++++++++++++++++++\n' +
  '+++++++++++++++++++++ STARTED +++++++++++++++++++++\n' +
  '+++++++++++++++++++++++ ' +
  port +
  ' ++++++++++++++++++++++\n' +
  '+++++++++++++++++++++++++++++++++++++++++++++++++++\n';

server.listen(port, () => console.log(startLog));
