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
    // .pipe(ffmpeg('m4a', function(cmd) {
    // .pipe(ffmpeg('aac', function(cmd) {
      return cmd
        .audioBitrate('192k')
        .audioChannels(2)
        // .audioCodec('libfdk-aac')
        .audioCodec('libfdk_aac')
        // .audioCodec('libvo_aacenc')
        // .audioCodec('libfaac')
        // .audioCodec('libvo-aacenc')
        // .audioCodec('libmp3lame')
        .noVideo()
        .on('end', function() {
          console.log('sounds: Processing finished');
        })
        .on('error', util.log);
    }))
    .pipe(gulp.dest(config.path.destination.sounds))
    .on('error', util.log);
});

gulp.task('sounds:watch', function() {
  gulp.watch(config.path.source.sounds + config.files.sounds, ['sounds']);
});
