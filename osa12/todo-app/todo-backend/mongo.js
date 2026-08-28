const mongoose = require('mongoose');

const { MONGO_URL } = require('./util/config');

const connect = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(MONGO_URL);
  console.log('connected to MongoDB');
};

module.exports = { connect };
