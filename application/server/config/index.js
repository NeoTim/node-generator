/**
 * Application configuration
 */

import express from 'express';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import path from 'path';
import lusca from 'lusca';
import passport from 'passport';
import session from 'express-session';
import DatabaseConfig from './database';
import EnvConfig from './environment';
import {liveReloadIgnore} from '../resources/utils';

export default {

  DEFAULT_ENV:  'Development',
  DEFAULT_PORT:  9000,
  DEFAULT_IP:   '127.0.0.1',

  /**
   *   Database Config.
   */
  dbconfig: DatabaseConfig,

  /**
   *   Environment Config.
   */
  envConfig: EnvConfig,

  /**
   *   View engine module.
   */
  engineType: 'ejs',

  /**
   *   Express session options.
   */
  sessionOptions: {
    secret: EnvConfig.secrets.session,
    saveUninitialized: true,
    resave: false
  },

  /**
   *   Express Lusca options.
   */
  luscaOptions: {
    csrf: {
      aurelia: true
    },
    xframe: 'SAMEORIGIN',
    hsts: {
      maxAge: 31536000, //1 year, in seconds
      includeSubDomains: true,
      preload: true
    },
    xssProtection: true
  },

  preConfigure(app) {
    this.envConfig.configure(app, this);
    this.dbconfig.configure(app, this);
    this.port = this.envConfig.port;
    this.ip   = this.envConfig.ip;
    this.env  = this.envConfig.env;

    app.use(express.static(global.fromRoot('client')));
    // app.use(favicon(global.fromRoot('client/favicon.ico')));
  },

  configure(app) {
    /**
     *   Development Logging
     */
    if (this.envConfig.isDev()) {
      app.use(morgane('dev'))
    }

    /**
     *   View Rendering configurations.
     */
    app.set('views', global.fromRoot('application/server/views'))
    app.engine('html', require(this.engineType).renderFile);
    app.set('view engine', 'html');

    /**
     *   Form/ body parsing configurations.
     */
    app.use(compression())
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    /**
     *   Authentication and session storage configurations.
     */
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(session(this.sessionOptions));
    app.use(lusca(this.luscaOptions));

    if (this.envConfig.isDev()) {
      app.use(liveReloadIgnore())
    }

    if (!this.envConfig.isProd()) {
      app.use(errorHandler()); // Must be last import
    }
  }
}
