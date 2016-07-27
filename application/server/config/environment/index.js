const env = process.env.NODE_ENV;
// module.exports = require(`./${env}.js`).default;
import DevConfig from './development';
import EnvConfig from './base';

const config = Object.assign({}, EnvConfig, DevConfig);

export default config;
