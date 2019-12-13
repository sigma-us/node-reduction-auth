"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const massive = require('massive');
const DB_URL = process.env.DB_URL;
const bcrypt = require('bcrypt');

const app = express();

app.use(bodyParser.json());

app.get('/api/register', (req, res) => {
  const db = app.get('db');
  const user = {
    firstname: 'first',
    lastname: 'last',
    username: 'test',
    email: 'test@gmail.com',
    password: 'okokokokokokok'
  }
  // db.users.insert(user, (err, res) => {
  //   console.log(err, res);
  // })
  db.users.findOne({id: 2}, function(err, dbres) {
    console.log(err, dbres);
  })
});

// postgresql connection register with massive js
massive(DB_URL).then(massiveInstance => {
  app.set('db', massiveInstance);
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  })
});