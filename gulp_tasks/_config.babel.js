'use strict';

import fs from 'fs';

import manifest from '../package.json';

const bowerrc = JSON.parse(fs.readFileSync('.bowerrc'));

var config = {
  domain: manifest.domain,
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
config.path = {
  bowerComponents: bowerrc.directory + '/',
  nodeModules: 'node_modules/',
  root: './',
  source: {
    base: 'app/'
  },
  destination: {
    base: 'www/'
  }
};

config.path.source.documentation = config.path.source.base + '/documentation/';
config.path.source.elements = config.path.source.base + '/elements/';
config.path.source.fonts = config.path.source.base + '/fonts/';
config.path.source.markup = config.path.source.base + '/';
config.path.source.icons = config.path.source.base + '/icons/';
config.path.source.images = config.path.source.base + '/images/';
config.path.source.scripts = config.path.source.base + '/scripts/';
config.path.source.screenshots = config.path.source.base + '/screenshots/';
config.path.source.sounds = config.path.source.base + '/sounds/';
config.path.source.styles = config.path.source.base + '/styles/';
config.path.source.styleguide = config.path.source.base + '/styleguide/';
config.path.source.videos = config.path.source.base + '/videos/';

config.path.destination.documentation = config.path.destination.base + '/documentation/';
config.path.destination.elements = config.path.destination.base + '/elements/';
config.path.destination.fonts = config.path.destination.base + '/fonts/';
config.path.destination.markup = config.path.destination.base + '/';
config.path.destination.icons = config.path.destination.base + '/icons/';
config.path.destination.images = config.path.destination.base + '/images/';
config.path.destination.scripts = config.path.destination.base + '/scripts/';
config.path.destination.screenshots = config.path.destination.base + '/screenshots/';
config.path.destination.sounds = config.path.destination.base + '/sounds/';
config.path.destination.styles = config.path.destination.base + '/styles/';
config.path.destination.styleguide = config.path.destination.base + '/styleguide/';
config.path.destination.videos = config.path.destination.base + '/videos/';

config.files = {
  configuration: {
    json: config.path.root + '{*.json,.*rc}',
    yaml: config.path.root + '{*.yml,.*.yml}'
  },
  documentation: [
    config.path.source.base + 'README.md'
  ],
  icons: [
    config.path.source.base + '**/*.svg'
  ],
  images: [
    config.path.source.base + '**/*.{gif,jpg,jpeg,png}'
  ],
  maps: [
    config.path.source.base + '**/*.map'
  ],
  markup: [
    config.path.source.base + '**/*.html'
  ],
  miscellaneous: [
    config.path.source.base + '*.{css,ico,json,txt}'
  ],
  packages: [
    config.path.nodeModules + 'apache-server-configs/dist/.htaccess'
  ],
  scripts: [
    // config.path.source.base + '**/!(*-min).js'
    config.path.source.base + '**/*.js'
  ],
  sounds: [
    config.path.source.base + '**/*.{ogg,pcm,mp3,wav}'
  ],
  styles: [
    config.path.source.base + '**/*.scss'
  ],
  tasks: [
    config.path.root + 'gulpfile.js',
    config.path.root + 'gulpfile.babel.js',
    config.path.root + 'gulp_tasks/**/*.js'
  ],
  videos: [
    config.path.source.base + '**/*.{avi,ogg,mov,mp4,mpg,mpeg}'
  ]
};

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
  // snippetOptions: {
  //   rule: {
  //     match: '<span id="browser-sync-binding"></span>',
  //     fn: function(snippet) {
  //       // temporary workaround below as browser-sync 2.7.11 tries to inject
  //       // the client with an incorrect version number appended to the filename
  //       snippet = '<script async src="/browser-sync/browser-sync-client.js"></script>';
  //       console.log('snippet', snippet);
  //       return snippet;
  //     }
  //   }
  // },
  ui: {
    port: manifest.config.server.browsersync.ui.port
  }
};

var browserSync = require('browser-sync').create();

export default config;
export {config, browserSync};
