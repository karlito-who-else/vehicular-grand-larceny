'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import plumber from 'gulp-plumber';
import pngquant from 'imagemin-pngquant';

import config from './_config.babel.js';
import reportError from './_report-error.babel.js';

const sourceFiles = config.files.images;

gulp.task('images', () => {
  return gulp.src(sourceFiles)
    .pipe(plumber())
    .pipe(debug({
      title: 'images:'
    }))
    .pipe(imagemin({
      progressive: true,
      // svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(config.path.destination.base))
    .on('error', reportError);
});

gulp.task('images:watch', function() {
  gulp.watch(sourceFiles, ['images']);
});
