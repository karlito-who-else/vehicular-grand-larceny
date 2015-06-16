'use strict';

// var browserSync = require('browser-sync');
// var cache = require('gulp-cached');
var gulp = require('gulp');
// var remember = require('gulp-remember');

var config = require(__dirname + '/_config');

gulp.task(
  'watch', [
    'browser-sync'
  ],
  function() {
    // global.isWatching = true;

    gulp.watch(config.files.markup, ['markup']);
    gulp.watch(config.files.scripts, ['scripts']);
    gulp.watch(config.files.styles, ['styles']);
    // gulp.watch(config.files.styles, ['styleguide']);

    // gulp.watch(config.files.markup, browserSync.reload);
    // gulp.watch(config.files.scripts, browserSync.reload);
    // gulp.watch(config.files.styles, browserSync.reload);
    // gulp.watch(config.files.styles, browserSync.reload);
  }
);
