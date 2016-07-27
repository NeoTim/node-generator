import express from 'express';
import Config from './config';
import Auth from './auth';
import Api from './api';
import Sockets from './resources/sockets';
import http from 'http';


class Server {

  config = Config;

  sockets = new Sockets();

  auth = new Auth();

  api = new Api();

  app = express();

  constructor() {
    this.config.preConfigure(this.app);
    this.server = http.createServer(this.app);
    this.sockets.configure(this.server, this.config);
    this.config.configure(this.app);
    this.auth.configure(this.app, this.config);
    this.api.configure(this.app, this.config);
  }

  start() {
    this.server.listen(this.config.port, ()=> {
      console.log(`Express API Running on localhost:${this.config.port}`);
    })
  }
}

module.exports = new Server();
