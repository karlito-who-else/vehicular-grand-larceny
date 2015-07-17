'use strict';

import debug from 'gulp-debug';
import dss from 'gulp-dss';
import gulp from 'gulp';
import reportError from './_report-error.babel.js';

import config from './_config.babel.js';

const sourceFiles = config.files.styles;

gulp.task('styleguide', () => {
  return gulp.src(sourceFiles)
    .pipe(debug({
      title: 'styleguide:'
    }))
    .pipe(dss({
      output: 'index.html',
      templatePath: config.path.source.styleguide + '/templates'
    }))
    .pipe(gulp.dest(config.path.destination.styleguide))
    .on('error', reportError);
});

gulp.task('styleguide:watch', function() {
  gulp.watch(sourceFiles, ['styleguide']);
});
