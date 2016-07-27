/**
 * Application configuration
 */

import path from 'path';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
const MongoStore = connectMongo(session);
mongoose.Promise = bluebird;

export default {

  mongoURI: 'mongodb://localhost:27017/test',

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  configure(app, config) {
    config.mongo = Object.assign({}, config.mongo, this.mongo);

    config.sessionOptions.store = new MongoStore({
      mongooseConnection: mongoose.connection,
      db: 'temp'
    })
    mongoose.connect(this.mongoURI, config.mongo);
    mongoose.connection.on('error', mongoConnectError);
    // if (config.enableSeeding) require('./mongo-seed');
  }
}



function mongoConnectError() {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(-1);
}

