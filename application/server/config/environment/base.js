'use strict';

var path = require('path');
var _ = require('lodash');

/**
 *   All configurations will extend these options.
 */
export default {

  /**
   *   current node environemt.
   */
  env: process.env.NODE_ENV || process.env.DEFAULT_ENV | 'development',

  /**
   *   Web Host port.
   */
  port: process.env.PORT || process.env.DEFAULT_PORT || 9000,

  /**
   *   Root path of server.
   */
  root: global.fromRoot(),

  /**
   *   Root IP of the server
   */
  ip: process.env.IP || process.env.DEFAULT_IP || '127.0.0.1',

  /**
   *  Secret for session, you will want to change this and make it an environment variable.
   */
  secrets: {
    session: 'temp-secret'
  },

  /**
   *   Default user roles.
   */
  userRoles: ['guest', 'user', 'admin'],

  isDev() {
    return process.env.NODE_ENV === 'development';
  },

  isProd() {
    return process.env.NODE_ENV === 'production';
  },

  isTest() {
    return process.env.NODE_ENV === 'test';
  },

  configure(app, config) {},
}

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}
