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

app.post('/api/register', (req, res) => {
  const db = app.get('db');
  const user = {
    firstname: 'first',
    lastname: 'last',
    username: 'test',
    email: 'test@gmail.com',
    password: 'okokokokokokok'
  }
  console.log(req.body.user);
  db.users.insert(req.body.user, function(err, res) {
    console.log(err, res);
    if (!err) res.status(200).json(res);
    else res.status(400).json(err);
  })
  // db.users.findOne({id: 2}, function(err, dbres) {
  //   console.log(err, dbres);
  // })
});

// postgresql connection register with massive js
massive(DB_URL).then(massiveInstance => {
  app.set('db', massiveInstance);
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  })
});