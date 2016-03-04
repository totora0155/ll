import gulp from 'gulp';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.main.babel';

{
  const src = 'src/scripts/background.js';
  const dest = 'app/scripts/';

  gulp.task('script:background', () => {
    gulp.src(src)
      .pipe(webpack(Object.assign(webpackConfig, {
        output: {
          filename: 'background.js',
        },
      })))
      .pipe(gulp.dest(dest));
  });
}

{
  const src = 'src/scripts/popup.js';
  const dest = 'app/popup/scripts/';

  gulp.task('script:popup', () => {
    gulp.src(src)
      .pipe(webpack(Object.assign(webpackConfig, {
        output: {
          filename: 'popup.js',
        },
      })))
      .pipe(gulp.dest(dest));
  });
}

{
  const src = 'src/scripts/**/*.js';
  const tasks = ["script:background", "script:popup"];

  gulp.task('scripts', tasks, () => {
    gulp.watch(src, tasks);
  });
}
