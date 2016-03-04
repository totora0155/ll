import fs from 'fs';
import _config from './webpack.config.base.babel';

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => nodeModules[mod] = 'commonjs ' + mod);

const config = Object.assign({}, _config);

Object.assign(config, {
  target: 'electron',
  node: {
    __dirname: false,
  },
  externals: [
    {
      fs: 'require("fs")'
    },
    nodeModules,
    (() => {
      const IGNORES = ['electron'];
      return (context, request, cb) => {
        if (IGNORES.indexOf(request) >= 0) {
          return cb(null, 'require("' + request + '")');
        }
        return cb();
      };
    })(),
  ],
});

export default config;
