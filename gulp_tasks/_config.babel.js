'use strict';

import fs from 'fs';

import manifest from '../package.json';

const bowerrc = JSON.parse(fs.readFileSync('.bowerrc'));

var config = {
  domain: manifest.domain,
  files: {
    configuration: {
      json: './{*.json,.*rc}',
      yaml: './{*.yml,.*.yml}'
    },
    icons: '/**/*.svg',
    images: '/**/*.{gif,jpg,jpeg,png}',
    maps: '/**/*.map',
    markup: '/**/*.html',
    miscellaneous: '/*.{css,ico,json,txt}',
    packages: [
      '/node_modules/apache-server-configs/dist/.htaccess'
    ],
    // scripts: '/**/!(*-min).js',
    scripts: '/**/*.js',
    sounds: '/**/*.{ogg,pcm,mp3,wav}',
    styles: '/**/*.scss',
    tasks: [
      './*.{js}',
      './gulp_tasks/**/*.js'
    ],
    videos: '/**/*.{avi,ogg,mov,mp4,mpg,mpeg}'
  },
  path: {
    bowerComponents: bowerrc.directory,
    nodeModules: 'node_modules',
    root: '.',
    source: {
      base: 'app'
    },
    destination: {
      base: 'www'
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
config.path.source.documentation = config.path.source.base + '/documentation';
config.path.destination.documentation = config.path.destination.base + '/documentation';

config.path.source.elements = config.path.source.base + '/elements';
config.path.destination.elements = config.path.destination.base + '/elements';

config.path.source.fonts = config.path.source.base + '/fonts';
config.path.destination.fonts = config.path.destination.base + '/fonts';

config.path.source.markup = config.path.source.base;
config.path.destination.markup = config.path.destination.base;

config.path.source.icons = config.path.source.base + '/icons';
config.path.destination.icons = config.path.destination.base + '/icons';

config.path.source.images = config.path.source.base + '/images';
config.path.destination.images = config.path.destination.base + '/images';

config.path.source.scripts = config.path.source.base + '/scripts';
config.path.destination.scripts = config.path.destination.base + '/scripts';

config.path.source.screenshots = config.path.source.base + '/screenshots';
config.path.destination.screenshots = config.path.destination.base + '/screenshots';

config.path.source.sounds = config.path.source.base + '/sounds';
config.path.destination.sounds = config.path.destination.base + '/sounds';

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
  // proxy: 'http://localhost:' + config.port.http,
  server: {
    baseDir: ['.tmp', 'www'],
    routes: {
      '/bower_components': 'bower_components',
      '/node_modules': 'node_modules'
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
export {config, browserSync};
