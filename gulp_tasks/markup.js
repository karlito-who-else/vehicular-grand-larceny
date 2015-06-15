'use strict';

var gulp = require('gulp');
var htmlhint = require('gulp-htmlhint');
var util = require('gulp-util');

var config = require(__dirname + '/_config');

gulp.task('markup', function() {
  return gulp.src(config.files.markup)
    .pipe(htmlhint('.htmlhintrc'))
    .on('error', util.log);
});

gulp.task('markup:watch', function() {
  gulp.watch(config.files.markup, ['markup']);
});
