'use strict';
require('dotenv').config();
const express = require('express');
const server = express();
const dbConnection = require('./database');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const api = require('./api/api');
const usersApi = require('./api/users');

const port = process.env.PORT || '3005';
server.set('port', port);

/*-*-*-*-*-*-*-*-*-*-*
 * M i d d l w a r e s
 *-*-*-*-*-*-*-*-*-*-*/
server.use(
  session({
    secret: 'volo-voco-bulo-lush-ious',
    resave: false,
    store: new MongoStore({ mongooseConnection: dbConnection }),
    saveUninitialized: false
  })
);

// Passport
server.use(passport.initialize());
server.use(passport.session());
require('./passport')(passport);

// Body-parser
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

server.use(express.static(path.join(__dirname, '../client/build')));

/*-*-*-*-*-*-*-*
 * R o u t e s
 *-*-*-*-*-*-*/
server.use('/api', api);
server.use('/users', usersApi);

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
