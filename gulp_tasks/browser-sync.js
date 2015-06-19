import gulp from 'gulp';

import {config, browserSync} from './_config.js';

gulp.task(
  'browser-sync', [
    'build'
  ],
  function() {
    browserSync.init(config.instance.browsersync);
  }
);
