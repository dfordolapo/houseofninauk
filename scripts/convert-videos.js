import { execFile } from 'child_process';
import path from 'path';
import fs from 'fs';
import ffmpeg from 'ffmpeg-static';

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    console.log(`Running ffmpeg ${args.slice(0, 4).join(' ')}...`);
    execFile(ffmpeg, args, (error, stdout, stderr) => {
      if (error) {
        console.error('FFmpeg error:', stderr);
        return reject(error);
      }
      resolve(stdout);
    });
  });
}

async function convertVideos() {
  console.log('Converting videos to web-optimized formats (WebM, WebP posters, and animated WebP)...');

  // 1. Landing Page Video (15558864_1080_1920_30fps.mp4)
  const inputLanding = path.resolve('public/videos/15558864_1080_1920_30fps.mp4');
  const outputLandingWebm = path.resolve('public/videos/15558864.webm');
  const outputLandingPosterWebp = path.resolve('public/videos/15558864_poster.webp');
  const outputLandingAnimatedWebp = path.resolve('public/videos/15558864.webp');

  // Generate WebM (VP9, speed 4, 720p width for high speed streaming)
  console.log('Generating WebM for landing/quickview video...');
  await runFfmpeg([
    '-y',
    '-i', inputLanding,
    '-c:v', 'libvpx-vp9',
    '-b:v', '1500k',
    '-crf', '32',
    '-speed', '4',
    '-threads', '4',
    '-row-mt', '1',
    '-an',
    '-vf', 'scale=720:-2',
    outputLandingWebm
  ]);
  console.log('✓ Created 15558864.webm:', (fs.statSync(outputLandingWebm).size / 1024 / 1024).toFixed(2), 'MB (was 7.11 MB)');

  // Generate high quality WebP poster from 1st second
  console.log('Generating WebP poster for landing/quickview video...');
  await runFfmpeg([
    '-y',
    '-ss', '00:00:01',
    '-i', inputLanding,
    '-vframes', '1',
    '-c:v', 'libwebp',
    '-q:v', '85',
    outputLandingPosterWebp
  ]);
  console.log('✓ Created 15558864_poster.webp:', (fs.statSync(outputLandingPosterWebp).size / 1024).toFixed(1), 'KB');

  // Generate animated WebP preview (scaled 400px, 12fps, 3s loop for lightweight animated preview)
  console.log('Generating animated WebP preview...');
  await runFfmpeg([
    '-y',
    '-i', inputLanding,
    '-t', '3',
    '-vf', 'scale=400:-2,fps=12',
    '-c:v', 'libwebp',
    '-lossless', '0',
    '-compression_level', '3',
    '-q:v', '60',
    '-loop', '0',
    outputLandingAnimatedWebp
  ]);
  console.log('✓ Created 15558864.webp:', (fs.statSync(outputLandingAnimatedWebp).size / 1024 / 1024).toFixed(2), 'MB');

  // 2. Footer Video (footer-video.mp4)
  const inputFooter = path.resolve('public/videos/footer-video.mp4');
  const outputFooterWebm = path.resolve('public/videos/footer-video.webm');
  const outputFooterPosterWebp = path.resolve('public/videos/footer-video_poster.webp');

  console.log('Generating WebM for footer campaign video...');
  await runFfmpeg([
    '-y',
    '-i', inputFooter,
    '-c:v', 'libvpx-vp9',
    '-b:v', '1500k',
    '-crf', '32',
    '-speed', '4',
    '-threads', '4',
    '-row-mt', '1',
    '-vf', 'scale=1080:-2',
    '-c:a', 'libopus',
    '-b:a', '96k',
    outputFooterWebm
  ]);
  console.log('✓ Created footer-video.webm:', (fs.statSync(outputFooterWebm).size / 1024 / 1024).toFixed(2), 'MB (was 5.28 MB)');

  console.log('Generating WebP poster for footer campaign video...');
  await runFfmpeg([
    '-y',
    '-ss', '00:00:01',
    '-i', inputFooter,
    '-vframes', '1',
    '-c:v', 'libwebp',
    '-q:v', '85',
    outputFooterPosterWebp
  ]);
  console.log('✓ Created footer-video_poster.webp:', (fs.statSync(outputFooterPosterWebp).size / 1024).toFixed(1), 'KB');

  console.log('Video conversions finished successfully!');
}

convertVideos().catch(err => {
  console.error('Error during video conversion:', err);
  process.exit(1);
});
