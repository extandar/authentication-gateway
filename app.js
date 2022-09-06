'use strict';

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Firebase
var serviceAccount = require("./docs/serviceAccountKey.json");
const { initializeApp, cert } = require('firebase-admin/app');
initializeApp({
  credential: cert(serviceAccount)
});

module.exports = app;