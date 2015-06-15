'use strict';

var dss = require('gulp-dss');
var gulp = require('gulp');
var util = require('gulp-util');

var config = require(__dirname + '/_config');

gulp.task('styleguide', function() {
  return gulp.src(config.files.styles)
    .pipe(dss({
      output: 'index.html',
      templatePath: config.path.styleguide + '/templates'
    }))
    .pipe(gulp.dest(config.path.styleguide))
    .on('error', util.log);
});

gulp.task('styleguide:watch', function() {
  gulp.watch(config.files.styles, ['styleguide']);
});
