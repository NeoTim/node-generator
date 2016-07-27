import UserRouter from './user';
import errors from '../resources/errors';
import path from 'path';

const unknownRoutes = {
  all: '/*',
  complex: '/:url(api|auth|components|app|bower_components|assets)/*',
}

export default class Api {

  /**
   *   User api endpoint
   */
  userRouter = new UserRouter();

  configure(app, config) {
    this.app    = app;
    this.config = config;
    this.userRouter.configure(app, config);
  }

  handleUnknownRoutes(app, config) {
    app.route(unknownRoutes.complex).get(errors[404]);
    app.route(unknownRoutes.all).get(redirectToRoot)

    /////////////////////////
    function redirectToRoot(req, res) {
      res.sendFile(global.fromRoot('client/index.html'));
    }
  }
}
