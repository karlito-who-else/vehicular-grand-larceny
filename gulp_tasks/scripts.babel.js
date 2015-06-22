'use strict';

import concat from 'gulp-concat';
import debug from 'gulp-debug';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import jscs from 'gulp-jscs';
import jshint from 'gulp-jshint';
// import modernizr from 'gulp-modernizr';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import util from 'gulp-util';

import {config, browserSync} from './_config.babel.js';

gulp.task('scripts', function() {
  return gulp.src(config.path.source.scripts + config.files.scripts)
    .pipe(debug({
      title: 'scripts:'
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulpif(!browserSync.active, jshint.reporter('fail')))
    .pipe(jscs({
      fix: true
    }))
    .pipe(sourcemaps.init())
    .pipe(concat('app-min.js'))
    // .pipe(modernizr())
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(config.path.destination.scripts))
    .on('error', util.log);
});

gulp.task('scripts:watch', function() {
  gulp.watch(config.path.source.scripts + config.files.scripts, ['scripts']);
});
