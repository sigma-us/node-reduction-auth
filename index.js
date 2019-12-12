"use strict";

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
})