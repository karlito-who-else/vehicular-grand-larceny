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
        .addOptions([
          '-movflags frag_keyframe+faststart'
        ])
        .audioBitrate(192)
        .audioChannels(2)
        .audioCodec('libfdk_aac')
        // .audioCodec('libfdk-aac')
        // .audioCodec('libvo_aacenc')
        // .audioCodec('libfaac')
        // .audioCodec('libvo-aacenc')
        // .audioCodec('libmp3lame')
        .audioFrequency(22050)
        .noVideo()
        .on('end', function() {
          console.log('sounds: Processing finished');
        })
        .on('error', util.log);
    }))
    .pipe(gulp.dest(config.path.destination.base))
    .on('error', util.log);
});

gulp.task('sounds:watch', function() {
  gulp.watch(config.path.source.base + config.files.sounds, ['sounds']);
});
