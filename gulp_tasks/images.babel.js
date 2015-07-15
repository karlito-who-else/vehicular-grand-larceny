'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import util from 'gulp-util';

import config from './_config.babel.js';

const sourceFiles = config.files.images;

gulp.task('images', () => {
  return gulp.src(sourceFiles)
    .pipe(debug({
      title: 'images:'
    }))
    .pipe(imagemin({
      progressive: true,
      // svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(config.path.destination.base))
    .on('error', util.log);
});

gulp.task('images:watch', function() {
  gulp.watch(sourceFiles, ['images']);
});
