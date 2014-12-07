var gulp, sass, sourcemaps;

gulp = require('gulp');
sass = require('gulp-sass');
sourcemaps = require('gulp-sourcemaps');

var paths = {
  scripts: 'assets/javascripts/**/*.coffee',
  css: 'assets/stylesheets/**/*.sass',
  images: 'client/images/**/*'
};

gulp.task('default', function() {
  // gulp.src("./assets/*.mustache")
  //   .pipe(gulp.dest("./dist"));
  gulp.src('./assets/views/*.html')
    .pipe(gulp.dest('./public'));
  gulp.src('./assets/stylesheets/*.sass')
    .pipe(sourcemaps.init())
      .pipe(sass())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public/css'));

  gulp.watch([paths.scripts, paths.css], ['default']);
});