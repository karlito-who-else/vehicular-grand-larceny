'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import htmlhint from 'gulp-htmlhint';
import htmltidy from 'gulp-htmltidy';
import util from 'gulp-util';

import config from './_config.js';

gulp.task('markup', function() {
  return gulp.src(config.path.source.markup + config.files.markup)
    .pipe(debug({
      title: 'markup:'
    }))
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmltidy())
    .pipe(gulp.dest(config.path.destination.markup))
    .on('error', util.log);
});

gulp.task('markup:watch', function() {
  gulp.watch(config.path.source.markup + config.files.markup, ['markup']);
});
