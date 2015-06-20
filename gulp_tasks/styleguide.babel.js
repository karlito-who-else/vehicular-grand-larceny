'use strict';

import debug from 'gulp-debug';
import dss from 'gulp-dss';
import gulp from 'gulp';
import util from 'gulp-util';

import config from './_config.js';

gulp.task('styleguide', function() {
  return gulp.src(config.path.source.styles + config.files.styles)
    .pipe(debug({
      title: 'styleguide:'
    }))
    .pipe(dss({
      output: 'index.html',
      templatePath: config.path.source.styleguide + '/templates'
    }))
    .pipe(gulp.dest(config.path.destination.styleguide))
    .on('error', util.log);
});

gulp.task('styleguide:watch', function() {
  gulp.watch(config.path.source.styles + config.files.styles, ['styleguide']);
});
