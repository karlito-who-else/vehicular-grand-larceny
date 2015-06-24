'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import phantom from 'phantomjs2';
import util from 'gulp-util';
import webshot from 'gulp-webshot';

import config from './_config.babel.js';

gulp.task('screenshots', () => {
  return gulp.src(config.path.source.base + config.files.markup)
    .pipe(debug({
      title: 'screenshots:'
    }))
    .pipe(webshot({
      phantomPath: phantom.path,
      dest: config.path.destination.screenshots,
      root: config.path.source.base
    }))
    .on('error', util.log);
});

gulp.task('screenshots:watch', function() {
  gulp.watch(config.path.source.screenshots + config.files.markup, ['screenshots']);
});
