"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const massive = require('massive');
const DB_URL = process.env.DB_URL;
const bcrypt = require('bcrypt');
const saltRouds = 10;

const app = express();

app.use(bodyParser.json());


// routes to be separated out not necessary for now
app.post('/api/register', async (req, res) => {
  bcrypt.hash(req.body.user.password, saltRouds, async (err, hash) => {
    try {
      const db = app.get('db');
      req.body.user.password = hash;
      delete req.body.user.confirmpassword;
      const response = await db.users.insert(req.body.user);

      console.log(response);
      res.status(201).json(response);
    } catch (e) {
      res.status(400).json(e)
    }
  })

});

app.get('/api/check/username', async (req, res) => {
  try {
    const db = app.get('db');
    const response = await db.users.find({ username: req.query.username });
    console.log(response);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).error(e);
  }
});

app.get('/api/check/email', async (req, res) => {
  try {
    const db = app.get('db');
    const response = await db.users.find({ email: req.query.email });
    console.log(response);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).error(e);
  }
})

// end routes 

// postgresql connection register with massive js
massive(DB_URL).then(massiveInstance => {
  app.set('db', massiveInstance);
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  })
});