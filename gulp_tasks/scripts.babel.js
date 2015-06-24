'use strict';

// import concat from 'gulp-concat';
import debug from 'gulp-debug';
import gulp from 'gulp';
// import gulpif from 'gulp-if';
import jscs from 'gulp-jscs';
import jshint from 'gulp-jshint';
// import modernizr from 'gulp-modernizr';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import util from 'gulp-util';

// import {config, browserSync} from './_config.babel.js';
import config from './_config.babel.js';

gulp.task('scripts', () => {
  // run from base to include files in site root and elements folder
  return gulp.src(config.path.source.base + config.files.scripts)
    .pipe(debug({
      title: 'scripts:'
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    // .pipe(gulpif(!browserSync.active, jshint.reporter('fail')))
    .pipe(jscs({
      fix: true
    }))
    .pipe(sourcemaps.init())
    // .pipe(concat('app-min.js'))
    // .pipe(modernizr())
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(config.path.destination.base))
    .on('error', util.log);
});

gulp.task('scripts:watch', function() {
  gulp.watch(config.path.source.base + config.files.scripts, ['scripts']);
});
