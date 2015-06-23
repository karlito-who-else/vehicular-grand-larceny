'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import jscs from 'gulp-jscs';
import jshint from 'gulp-jshint';
import jsonlint from 'gulp-jsonlint';
import yamlvalidate from 'gulp-yaml-validate';
import util from 'gulp-util';

import config from './_config.babel.js';

gulp.task('framework', () => {
  gulp.src(config.files.tasks)
    .pipe(debug({
      title: 'framework (tasks):'
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jscs({
      fix: false
    }))
    .on('error', util.log);

  gulp.src(config.files.configuration.json)
    .pipe(debug({
      title: 'framework (configuration:json):'
    }))
    .pipe(jsonlint())
    .pipe(jsonlint.reporter(util.log))
    .on('error', util.log);

  gulp.src(config.files.configuration.yaml)
    .pipe(debug({
      title: 'framework (configuration:yaml):'
    }))
    .pipe(yamlvalidate())
    .on('error', util.log);
});

gulp.task('framework:watch', function() {
  gulp.watch(config.files.framework, ['framework']);
});
