'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import util from 'gulp-util';
import webshot from 'gulp-webshot';

import config from './_config.js';

gulp.task('screenshots', function() {
  return gulp.src(config.path.source.markup + config.files.markup)
    .pipe(debug({
      title: 'screenshots:'
    }))
    .pipe(webshot({
      dest: config.path.destination.screenshots,
      root: config.path.source.screenshots
    }))
    .on('error', util.log);
});

gulp.task('screenshots:watch', function() {
  gulp.watch(config.path.source.markup + config.files.markup, ['markup']);
});
