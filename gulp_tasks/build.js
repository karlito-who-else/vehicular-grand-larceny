var gulp = require('gulp');

gulp.task(
  'build', [
    'markup',
    'scripts',
    'styles',
    'styleguide'
  ]
);
