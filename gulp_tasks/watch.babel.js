'use strict';

import gulp from 'gulp';

import config from './_config.babel.js';

gulp.task('watch', [
  'browser-sync'
], () => {
  gulp.watch(config.path.source.markup + config.files.markup, ['markup']);
  gulp.watch(config.path.source.scripts + config.files.scripts, ['scripts']);
  gulp.watch(config.path.source.styles + config.files.styles, ['styles']);
});
