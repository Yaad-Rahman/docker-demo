const express = require('express');
const mongoose = require('mongoose');


const app = express();

app.get('/', (req, res) => {
  res.send('Hello from inside a Docker container!');
});

app.get('/db-status', (req, res) => {
  res.json({ mongoConnected: mongoose.connection.readyState === 1 });
});

module.exports = app;