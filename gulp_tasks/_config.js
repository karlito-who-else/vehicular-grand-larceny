import path from 'path';

const manifest = require(__dirname + '/../package.json');

var config = {
  domain: 'vgl.com',
  files: {
    images: '/**/*.{gif,jpg,jpeg,png,svg}',
    maps: '/**/*.map',
    markup: '/**/*.html',
    scripts: '/**/!(*-min).js',
    styles: '/**/*.scss',
    videos: '/**/*.{ogg,mov,mp4}'
  },
  path: {
    bowerComponents: path.normalize(__dirname + '/../bower_components'),
    nodeModules: path.normalize(__dirname + '/../node_modules'),
    source: {
      base: path.normalize(__dirname + '/../app')
    },
    destination: {
      base: path.normalize(__dirname + '/../www')
    }
  },
  port: {
    http: process.env.PORT ? process.env.PORT : manifest.config.server.http.port
  },
  instance: {
    pagespeed: {
      key: ''
    }
  }
};

// Paths
config.path.source.elements = config.path.source.base + '/elements';
config.path.destination.elements = config.path.destination.base + '/elements';

config.path.source.markup = config.path.source.base;
config.path.destination.markup = config.path.destination.base;

config.path.source.images = config.path.source.base + '/images';
config.path.destination.images = config.path.destination.base + '/images';

config.path.source.scripts = config.path.source.base + '/scripts';
config.path.destination.scripts = config.path.destination.base + '/scripts';

config.path.source.screenshots = config.path.source.base + '/screenshots';
config.path.destination.screenshots = config.path.destination.base + '/screenshots';

config.path.source.styles = config.path.source.base + '/styles';
config.path.destination.styles = config.path.destination.base + '/styles';

config.path.source.styleguide = config.path.source.base + '/styleguide';
config.path.destination.styleguide = config.path.destination.base + '/styleguide';

config.path.source.videos = config.path.source.base + '/videos';
config.path.destination.videos = config.path.destination.base + '/videos';

// BrowserSync
config.instance.browsersync = {
  browser: ['google chrome'],
  files: [
    config.path.destination.base + '/**',
    '!' + config.path.destination.styles + config.files.styles,
    '!' + config.path.destination + config.files.maps
  ],
  notify: true,
  open: false,
  port: manifest.config.server.browsersync.port,
  proxy: 'http://localhost:' + config.port.http,
  server: {
    baseDir: ['.tmp', 'www'],
    routes: {
      '/bower_components': 'bower_components'
    }
  },
  snippetOptions: {
    rule: {
      match: '<span id="browser-sync-binding"></span>',
      fn: function(snippet) {
        // temporary workaround below as browser-sync 2.7.11 tries to inject
        // the client with an incorrect version number appended to the filename
        snippet = '<script async src="/browser-sync/browser-sync-client.js"></script>';
        return snippet;
      }
    }
  },
  ui: {
    port: manifest.config.server.browsersync.ui.port
  }
};

var browserSync = require('browser-sync').create();

export default config;
export {browserSync};
