'use strict';

import {Router} from 'express';
import Conroller from './user.controller';
import * as auth from '../../auth/auth.service';

export default class UserRouter {

  /**
   *   Express Router instance
   */
  router = new Router();

  /**
   *   User api request and response controller
   */
  controller = new Conroller();

  configure(app, config) {
    let router = this.router;
    let controller = this.controller;
    router.get('/', controller.index);
    router.delete('/:id', controller.destroy);
    router.get('/me', auth.isAuthenticated(), controller.me);
    router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
    router.get('/:id', auth.isAuthenticated(), controller.show);
    router.post('/', controller.create);
  }
}

