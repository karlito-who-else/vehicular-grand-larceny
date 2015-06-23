'use strict';

import gulp from 'gulp';

import {config, browserSync} from './_config.babel.js';

gulp.task('browser-sync', [
    'build'
  ], () =>
  browserSync.init(config.instance.browsersync)
);
