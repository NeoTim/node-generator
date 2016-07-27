'use strict';

import express from 'express';
import passport from 'passport';
import config from '../config/environment';
import User from '../api/user/user.model';
import AuthRouter from './local';
import LocalPassport from './local/passport';

export default class Auth {

  /**
   *   The Express Router Instance
   */
  router = express.Router();

  /**
   *   Local auth endpoint
   */
  authRouter = new AuthRouter();

  configure(app, config) {
    this.authRouter.configure(app, config);

    this.router.use(
      this.authRouter.endpoint,
      this.authRouter.router
    );
  }
}

