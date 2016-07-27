import EnvConfig from './base';

/**
 *   Test specific configuration.
 */
export default {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/temp-test'
  },

  sequelize: {
    uri: 'sqlite://',
    options: {
      logging: false,
      storage: 'test.sqlite',
      define: {
        timestamps: false
      }
    }
  }
}
