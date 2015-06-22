'use strict';

import gulp from 'gulp';

gulp.task('build', [
  'copy',
  'markup',
  'scripts',
  'styles',
  'offline',
  'precache'
]);
