'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import reportError from './_report-error.babel.js';

import config from './_config.babel.js';

const sourceFiles = config.files.images;

gulp.task('images', () => {
  return gulp.src(sourceFiles)
    .pipe(debug({
      title: 'images:'
    }))
    .pipe(imagemin())
    .pipe(gulp.dest(config.path.destination.base))
    .on('error', reportError);
});

gulp.task('images:watch', function() {
  gulp.watch(sourceFiles, ['images']);
});
