import EnvConfig from './base';

/**
 *   Production specific configuration.
 */
export default {
  // Server IP
  ip:  process.env.OPENSHIFT_NODEJS_IP ||
        process.env.IP ||
        process.env.DEFAULT_IP,

  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT ||
         process.env.PORT ||
         process.env.DEFAULT_PORT,

  // MongoDB connection options
  mongo: {
    uri:  process.env.MONGODB_URI ||
          process.env.MONGOHQ_URL ||
          process.env.OPENSHIFT_MONGODB_DB_URL +
          process.env.OPENSHIFT_APP_NAME ||
          'mongodb://localhost/temp',
  },
};
