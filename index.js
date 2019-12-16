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

app.post('/api/register', async (req, res) => {
  try {
    const db = app.get('db');
    const response = await db.users.insert(req.body.user);
    
    console.log(response);
    res.status(201).json(response);
  } catch (e) {
    res.status(400).json(e)
  }
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