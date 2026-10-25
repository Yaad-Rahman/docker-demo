const express = require('express');
const mongoose = require('mongoose');
const app = require('./app');
const PORT = process.env.PORT || 3000;

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/demo';

async function connectWithRetry() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed, retrying in 5 seconds...', err);
    setTimeout(connectWithRetry, 5000);
  }
}

connectWithRetry();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});