'use strict';

var gulp = require('gulp');

var instance = require(__dirname + '/_instance');
var config = require(__dirname + '/_config');

gulp.task(
  'browser-sync', [
    'build'
  ],
  function() {
    instance.browserSync.init(config.browsersync);
  }
);
