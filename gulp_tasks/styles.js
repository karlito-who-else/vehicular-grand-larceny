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
var instance = require(__dirname + '/_instance');

gulp.task('styles', function() {
  gulp.src(config.files.styles) // stream not returned, see https://github.com/dlmanning/gulp-sass/wiki/Common-Issues-and-Their-Fixes#gulp-watch-stops-working-on-an-error
    .pipe(cache('styles')) // only pass through changed files
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        includePaths: [
          config.path.bowerComponents,
          config.path.nodeModules,
          config.path.styles
        ]
      })
      .on('error', sass.logError)
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
    .pipe(gulp.dest(config.path.styles))
    .pipe(instance.browserSync.stream({match: '**/*.css'}))
    // .pipe(instance.browserSync.reload({stream: true}))
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
