'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import reportError from './_report-error.babel.js';

import config from './_config.babel.js';

const sourceFiles = config.files.miscellaneous;
sourceFiles.concat(config.files.packages);

gulp.task('copy', () => {
  return gulp.src(sourceFiles, {
      dot: true
    })
    .pipe(debug({
      title: 'copy:'
    }))
    .pipe(gulp.dest(config.path.destination.base))
    .on('error', reportError);
});

gulp.task('copy:watch', function() {
  gulp.watch(sourceFiles, ['copy']);
});
