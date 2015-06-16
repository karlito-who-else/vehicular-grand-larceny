'use strict';

var path = require('path');

var manifest = require(__dirname + '/../package.json');

var config = {};

config.files = {};
config.path = {};
config.port = {};

// Paths
config.path.base = path.normalize(__dirname + '/../www');
config.path.nodeModules = path.normalize(__dirname + '/../node_modules');

config.path.bowerComponents = config.path.root + '/bower_components';

config.path.markup = config.path.base;
config.path.scripts = config.path.base + '/scripts';
config.path.styles = config.path.base + '/styles';
config.path.styleguide = config.path.base + '/styleguide';

// Files
config.files.markup = config.path.markup + '/**/*.html';
config.files.scripts = config.path.scripts + '/**/*.js';
config.files.styles = config.path.styles + '/**/*.scss';

// BrowserSync
config.browsersync = {
  browser: ['google chrome'],
  files: [
    config.path.base + '/**',
    '!' + config.files.styles,
    '!' + config.path.base + '/**/*.map'
  ],
  notify: true,
  open: false,
  port: manifest.config.server.browsersync.port,
  proxy: 'http://localhost:' + process.env.PORT ? process.env.PORT : manifest.config.server.http.port,
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
        console.log(snippet);
        return snippet;
      }
    }
  },
  ui: {
    port: manifest.config.server.browsersync.ui.port
  }
};

module.exports = config;
