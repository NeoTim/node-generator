const path = require('path');

global.fromRoot    = path.join.bind(path, __dirname);

global.requireRoot = () => {
  var args = Array.prototype.slice.call(arguments);
  args.unshift(__dirname)
  return require(path.join.apply(path, args))
}

require('babel-polyfill')
require('babel-register')({});
require('./application/server').start()
