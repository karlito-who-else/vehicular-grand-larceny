'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import util from 'gulp-util';

import config from './_config.babel.js';

gulp.task('images', function() {
  return gulp.src(config.path.source.images + config.files.images)
    .pipe(debug({
      title: 'images:'
    }))
    .pipe(imagemin())
    .pipe(gulp.dest(config.path.images))
    .on('error', util.log);
});

gulp.task('images:watch', function() {
  gulp.watch(config.path.source.images + config.files.images, ['images']);
});
