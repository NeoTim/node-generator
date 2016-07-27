'use strict';

import User from './user.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

export default class Controller {

  /**
   * Get list of users
   * restriction: 'admin'
   */
  index(req, res) {
    return User.find({}, '-salt -password')
      .exec()
      .then((users)=> onfind(users))
      .catch(handleError(res));

    /////////////////////
    function onfind(users) {
      res.status(200).json(users);
    }
  }

  /**
   * Creates a new user
   */
  create(req, res, next) {
    let newUser;

    newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.save()
      .then((user)=> onsave(user))
      .catch(validationError(res));

    /////////////////////
    function onsave(user) {
      let token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    }
  }

  /**
   * Get a single user
   */
  show(req, res, next) {
    var userId = req.params.id;

    return User.findById(userId)
      .exec()
      .then(user => onfind(user))
      .catch(err => next(err));

    /////////////////////
    function onfind(user) {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    }
  }

  /**
   * Deletes a user
   * restriction: 'admin'
   */
  destroy(req, res) {
    return User.findByIdAndRemove(req.params.id)
      .exec()
      .then(ondestroy)
      .catch(handleError(res));

    ///////////////////
    function ondestroy() {
      res.status(204).end();
    }
  }

  /**
   * Change a users password
   */
  changePassword(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    return User.findById(userId)
      .exec()
      .then(setNewPassword)
      .catch(handleError(res))

    /////////////////////////////
    function setNewPassword(user) {
      if (!user.authenticate(oldPass)) return onfail();

      user.password = newPass;
      return user.save()
        .then(()=> onsave())
        .catch(validationError(res));
    }

    function onfail() {
      res.status(403).end();
    }

    function onsave() {
      res.status(204).end();
    }
  }

  /**
   * Get my info
   */
  me(req, res, next) {
    let userId = req.user._id;
    let query  = { _id: userId };

    return User.findOne(query, '-salt -password')
      .exec()
      .then(user => onfind(user))
      .catch(err => next(err));

    ////////////////////
    function onfind(user) { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      res.json(user);
    }
  }

  /**
   * Authentication callback
   */
  authCallback(req, res, next) {
    res.redirect('/');
  }
}


