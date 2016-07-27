import SocketIO from 'socket.io';

export default class Sockets {

  socketOptions = {
    serveClient: false,
    path: '/socket.io-client'
  };

  configure(server, config) {
    this.socketOptions.serveClient = !config.envConfig.isProd();
    this.socketio = SocketIO(server, this.socketOptions);

    this.startSockets(this.socketio);
  }

  startSockets(socketio) {
    // socket.io (v1.x.x) is powered by debug.
    // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
    //
    // ex: DEBUG: "http*,socket.io:socket"

    // We can authenticate socket.io users and access their token through socket.decoded_token
    //
    // 1. You will need to send the token in `client/components/socket/socket.service.js`
    //
    // 2. Require authentication here:
    // socketio.use(require('socketio-jwt').authorize({
    //   secret: config.secrets.session,
    //   handshake: true
    // }));
    socketio.on('connection', (socket)=> {
      const remoteAddress = socket.request.connection.remoteAddress;
      const remotePort    = socket.request.connection.remotePort;
      socket.address      = `${remoteAddress}:${remotePort}`;

      socket.connectedAt  = new Date();

      socket.log = (...data)=> {
        console.log(`SocketIO ${socket.nsp.name} [${socket.address}]`, ...data);
      }

      /**
       *   Invoke onDisconnect when disconnected.
       */
      socket.on('disconnect', () => {
        this.onDisconnect(socket);
        socket.log('DISCONNECTED');
      });

      /**
       *   Invoke onConnect when connected.
       */
      this.onConnect(socket);
      socket.log('CONNECTED');
    })
  }

  /**
   *   Perform required logic here when a user disconnects
   */
  onDisconnect(socket) {

  }

  /**
   *   Perform required logic here when a user connects
   */
  onConnect(socket) {
    // When the client emits 'info', this listens and executes
    socket.on('info', data => {
      socket.log(JSON.stringify(data, null, 2));
    });

    // Insert sockets below
    require('../api/thing/thing.socket').register(socket);
  }
}
