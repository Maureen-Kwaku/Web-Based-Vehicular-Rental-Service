// Database connection is handled here.......
const mongoose = require('mongoose');
// const runMigration = require('../../migrations');
const { bootManager } = require('../helpers');

module.exports = {
  connectToMongoDB: async ({ databaseURI }) => {
    try {
      await mongoose.connect(databaseURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true,
      });
      console.log('MongoDB has been connected to successfully');
      await bootManager();
    } catch (e) {
      console.error('Error occurred while connecting to database');
      throw e;
    }
    // await runMigration();
  },
};
