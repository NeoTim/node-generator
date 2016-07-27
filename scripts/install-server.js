const spawn = require('../application/lib/spawn');
const deps  = require('./deps.json');
const serverDeps = deps.server;

serverDeps.unshift('install', '--save-dev');

spawn('npm', serverDeps).then(()=> {
  console.log('processComplet')
})




