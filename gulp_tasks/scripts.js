'use strict';

var gulp = require('gulp');
// var modernizr = require('gulp-modernizr');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var util = require('gulp-util');

var config = require(__dirname + '/_config');

gulp.task('scripts', function() {
  return gulp.src(config.files.scripts)
    .pipe(sourcemaps.init())
    // .pipe(modernizr())
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(rename(function(path) {
      path.extname = '-min.js';
    }))
    .pipe(gulp.dest(config.path.scripts))
    .on('error', util.log);
});

gulp.task('scripts:watch', function() {
  gulp.watch(config.files.scripts, ['scripts']);
});
