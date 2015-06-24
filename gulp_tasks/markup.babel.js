'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import htmlhint from 'gulp-htmlhint';
// import htmltidy from 'gulp-htmltidy';
import minifyHTML from 'gulp-minify-html';

import util from 'gulp-util';

import config from './_config.babel.js';

gulp.task('markup', () => {
  return gulp.src(config.path.source.base + config.files.markup)
    .pipe(debug({
      title: 'markup:'
    }))
    .pipe(htmlhint('.htmlhintrc'))
    // .pipe(htmltidy())
    .pipe(minifyHTML())
    .pipe(gulp.dest(config.path.destination.base))
    .on('error', util.log);
});

gulp.task('markup:watch', function() {
  gulp.watch(config.path.source.base + config.files.markup, ['markup']);
});
