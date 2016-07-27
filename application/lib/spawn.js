const child_process = require('child_process');

const spawn = module.exports = function spawn(cmd, args) {
  var child;
  return new Promise(resolve => {
    console.log(args)
    child = child_process.spawn(cmd, args, {stdio: 'inherit'});
    child.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      resolve();
    });
  })
}
