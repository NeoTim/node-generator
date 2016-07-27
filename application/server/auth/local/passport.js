import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

export default class LocalPassport {

  errorHandlers = {
    noEmail:     {message: 'This email is not registered.'  },
    badPassword: { message: 'This password is not correct.' },
  };

  configure(User, config) {
    let strategy = (email, password, done)=> {
      return this.strategy(User, email, password, done);
    }

    passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password' // this is the virtual field on the model
    }, strategy))
  }

  strategy(User, email, password, done) {
    let tryAuthenticate;
    let handleServerError;
    let handleAuthenticated;

    email = email.toLowerCase();

    /**
     *   NOTE: done must be onvoked with the following params
     *    ` done( error:PassportError, user:UserModel, message:Object<ErrorMessage>)`
     *
     *   So if we find the user, we do something like this
     *    ` done(null, user) `
     *
     *   If we do not find the user we do something like this
     *    ` done(authError, false, {message: 'user not found'})`
     */
    handleAuthenticated = (authError, authenticated)=> {
      return (
          authError
          ?
          done(authError)
          :
          authenticated
          ?
          done(null, user)
          :
          done(null, false, this.errorHandlers.badPassword)
      );
    }

    tryAuthenticate = (user)=> {
      return (
          user
          ?
          user.authenticate(password, handleAuthenticated)
          :
          done(null, false, this.errorHandlers.noEmail)
      );
    }

    User.findOne({email})
        .exec()
        .then((user) => tryAuthenticate(user))
        .catch((err) => done(err));
  }
}
