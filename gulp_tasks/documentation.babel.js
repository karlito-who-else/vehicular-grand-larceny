'use strict';

import debug from 'gulp-debug';
import gulp from 'gulp';
import jsdoc from 'gulp-jsdoc';
import util from 'gulp-util';

import manifest from '../package.json';

import config from './_config.babel.js';

gulp.task('documentation', () => {
  return gulp.src([config.path.source.scripts + config.files.scripts, config.path.source.base + '/README.md'])
    .pipe(debug({
      title: 'documentation:'
    }))
    .pipe(jsdoc.parser({
      name: manifest.name,
      description: manifest.description,
      version: manifest.version,
      license: manifest.license,
      plugins: ['plugins/markdown']
    }, manifest.name))
    .pipe(jsdoc.generator(config.path.destination.documentation, {
        path: 'ink-docstrap',
        systemName: manifest.name,
        footer: 'For more information, see https://github.com/karlito-who-else/vehicular-grand-larceny/wiki',
        copyright: '&copy; copyright ' + new Date().getFullYear(),
        navType: 'vertical',
        theme: 'journal',
        linenums: true,
        collapseSymbols: false,
        inverseNav: false
      }, {
        'private': false,
        monospaceLinks: false,
        cleverLinks: false,
        outputSourceFiles: true
      })
    )
    // .pipe(gulp.dest(config.path.destination.documentation))
    .on('error', util.log);
});

gulp.task('documentation:watch', function() {
  gulp.watch(config.path.source.documentation + config.files.documentation, ['documentation']);
});
