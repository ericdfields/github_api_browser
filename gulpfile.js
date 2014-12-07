var gulp, sass, sourcemaps, bower, browserSync, uglify;

gulp       = require('gulp');
sass       = require('gulp-sass');
sourcemaps = require('gulp-sourcemaps');
browserSync = require('browser-sync');
uglify = require('gulp-uglify');

var reload = browserSync.reload;

var paths = {
  views: './assets/views/**/*.html',
  scripts: './assets/scripts/**/*.js',
  styles: './assets/stylesheets/**/*.sass'
};

gulp.task('views',function(){
  gulp.src(paths.views)
    .pipe(gulp.dest('./public'))
    .pipe(reload({ stream: true}));
})

gulp.task('styles', function() {
  gulp.src(paths.styles)
    .pipe(sourcemaps.init())
      .pipe(sass())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public/css'))
    .pipe(reload({ stream:true }));
});

gulp.task('scripts', function() {
  gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
    .pipe(reload({ stream: true}));
});

// watch files for changes and reload
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'public'
    }
  });

  gulp.watch(paths.views, ['views']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.scripts, ['scripts']);
});