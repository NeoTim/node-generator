'use strict';

import express from 'express';
import passport from 'passport';
import {signToken} from '../auth.service';
import LocalPassport from './passport';

export default class AuthRouter {
  /**
   *   local Express Router instance.
   */
  router = express.Router();

  /**
   *   Local passport strategy for authentication
   */
  passport = new LocalPassport();

  /**
   *   The base url endpoint for this router.
   */
  endpoint = '/local';


  /**
   *   Error handler message.
   */
  errorMessage = 'Something went wrong, please try again.';

  configurePassport(...args) {
    return this.passport.configure(...args);
  }

  configure(app, config, router) {
    this.router.post('/', this.localAthentication());

    return this.router;
  }

  localAthentication() {
    let errorStep;
    let userErrorStep;
    let continueStep;
    let authenticate;

    return (req, res, next)=> {

      errorStep = (err)=> {
        if (!err) return true;
        res.status(401).json(err)
      }

      userErrorStep = (user)=> {
        return user ? user : res.status(404).json({message: this.errorMessage});
      }

      continueStep = (user)=> {
        var token = signToken(user._id, user.role);
        res.json({ token });
      }

      authenticate = (err, user, info) => {
        if (errorStep(err) && userErrorStep(user)) {
          continueStep(user)
        }
      }

      passport.authenticate('local', authenticate)(req, res, next);
    }
  }
}
