'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';
import reportError from './_report-error.babel.js';

import config from './_config.babel.js';

const sourceFiles = config.files.icons;

gulp.task('icons', () => {
  return gulp.src(sourceFiles)
    .pipe(debug({
      title: 'icons:'
    }))
    .pipe(svgSprite({
      shape: {
        dimension: { // Set maximum dimensions
          maxWidth: 32,
          maxHeight: 32
        },
        spacing: { // Add padding
          padding: 10
        },
        dest: 'out/intermediate-svg' // Keep the intermediate files
      },
      mode: {
        view: { // Activate the «view» mode
          bust: false,
          render: {
            scss: true // Activate Sass output (with default options)
          }
        },
        symbol: true // Activate the «symbol» mode
      }
    }))
    .pipe(gulp.dest(config.path.destination.icons))
    .on('error', reportError);
});

gulp.task('icons:watch', function() {
  gulp.watch(sourceFiles, ['icons']);
});
