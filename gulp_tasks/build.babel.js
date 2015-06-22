'use strict';

import gulp from 'gulp';

import config from './_config.babel.js';

gulp.task(
  'build', [
    'markup',
    'scripts',
    'styles',
    'precache'
  ]
);
