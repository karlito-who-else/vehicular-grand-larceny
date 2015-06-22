'use strict';

import debug from 'gulp-debug';
import ffmpeg from 'gulp-fluent-ffmpeg';
import gulp from 'gulp';
import util from 'gulp-util';

import config from './_config.babel.js';

gulp.task('sounds', () => {
  return gulp.src(config.path.source.sounds + config.files.sounds)
    .pipe(debug({
      title: 'sounds:'
    }))
    .pipe(ffmpeg('mp4', function(cmd) {
      return cmd
        .audioBitrate('256k')
        .audioChannels(2)
        .audioCodec('libfaac');
    }))
    .pipe(gulp.dest(config.path.destination.sounds))
    .on('error', util.log);
});

gulp.task('sounds:watch', function() {
  gulp.watch(config.path.source.sounds + config.files.sounds, ['sounds']);
});
