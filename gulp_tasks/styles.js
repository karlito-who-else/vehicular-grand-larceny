'use strict';

var autoprefixer = require('gulp-autoprefixer');
var cache = require('gulp-cached');
var csscomb = require('gulp-csscomb');
var csso = require('gulp-csso');
var gulp = require('gulp');
var remember = require('gulp-remember');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
// var uncss = require('gulp-uncss');
var util = require('gulp-util');

var config = require(__dirname + '/_config');

gulp.task('styles', function() {
  return gulp.src(config.files.styles)
    .pipe(cache('styles')) // only pass through changed files
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        includePaths: [
          config.path.bowerComponents,
          config.path.nodeModules,
          config.path.styles
        ]
      }, {
        errLogToConsole: true
      })
    )
    .pipe(autoprefixer())
    .pipe(csscomb())
    .pipe(csso())
    // .pipe(uncss({
    //   html: [
    //     'index.html',
    //     'posts/**/*.html',
    //     'http://example.com'
    //   ]
    // }))
    .pipe(remember('styles')) // add back all files to the stream
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(config.path.base))
    .on('error', util.log);
});

gulp.task('styles:watch', function() {
  var watcher = gulp.watch(config.files.styles, ['styles']);
  console.log(cache.caches);
  watcher.on('change', function(event) {
    console.log('change', cache.caches);
    if (event.type === 'deleted') { // if a file is deleted, forget about it
      delete cache.caches['styles'][event.path];
      remember.forget('styles', event.path);
    }
  });
});
