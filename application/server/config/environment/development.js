import EnvConfig from './base';

/**
 *   Development specific configuration
 */
export default {
  /**
   *   MongoDB connection options.
   */
  mongo: {
    uri: 'mongodb://localhost/application-dev'
  },

  /**
   *   Seed database on startup.
   */
  seedDB: true,
};
