'use strict';

import del from 'del';
import gulp from 'gulp';

import config from './_config.js';

gulp.task('clean', () =>
  del(config.path.destination.base, {
    dot: true
  })
);
