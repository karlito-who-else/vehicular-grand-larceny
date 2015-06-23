'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import util from 'gulp-util';

import config from './_config.babel.js';

gulp.task('copy', () => {
  return gulp.src([
      config.path.source.base + config.files.miscellaneous,
      config.path.root + config.files.packages
    ], {
      dot: true
    })
    .pipe(debug({
      title: 'copy:'
    }))
    .pipe(gulp.dest(config.path.destination.base))
    .on('error', util.log);
});

gulp.task('copy:watch', function() {
  gulp.watch(config.files.miscellaneous, ['copy']);
});
