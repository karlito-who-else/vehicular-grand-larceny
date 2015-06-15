'use strict';

var browserSync = require('browser-sync');
var gulp = require('gulp');

var config = require(__dirname + '/_config');

gulp.task(
  'browser-sync', [
    'build'
  ],
  function() {
    browserSync.init(config.browsersync);
  }
);
