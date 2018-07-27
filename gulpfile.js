var gulp    = require('gulp'),
    rename  = require('gulp-rename'),
    sass    = require('gulp-sass'),
    babel   = require('gulp-babel');


gulp.task('default', ['sass', 'es6', 'watch']);

gulp.task('sass', function () {
    return gulp.src('./css/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./css/'));
});

gulp.task('es6', function() {
    gulp.src('./js/main.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(rename('./js/bundle.js'))
        .pipe(gulp.dest('./'))
});

gulp.task('watch', function () {
    gulp.watch('./js/**/*.js', ['es6']);
    gulp.watch('./css/**/*.scss', ['sass']);
});