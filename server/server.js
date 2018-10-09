'use strict';
require('dotenv').config();
const express = require('express');
const server = express();
const path = require('path');

const port = process.env.PORT || '3005';
server.set('port', port);

server.use(express.static(path.join(__dirname, '../client/build')));

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
