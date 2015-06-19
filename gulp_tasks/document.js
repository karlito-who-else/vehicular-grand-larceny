import gulp from 'gulp';

import config from './_config.js';

gulp.task(
  'build', [
    'screenshots',
    'styleguide'
  ]
);
