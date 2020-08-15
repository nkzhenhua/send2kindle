"use strict";
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var page = require('./routes/page.js');
app.use(page)
const port = process.env.PORT || 8080;
app.listen(port);
console.log('Node + Express REST API skeleton server started on port: ' + port);
