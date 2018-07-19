const gulp = require('gulp');
const ugly = require('gulp-uglify');
const clean = require('gulp-clean-css');
const rename = require('gulp-rename');
const img = require('gulp-imagemin');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const strip = require('gulp-strip-comments');
const removeUseStrict = require("gulp-remove-use-strict");

gulp.task('css', () => {
    return gulp.src('./css/draft.css')
        .pipe(clean({compatibility: 'ie8'}))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./css'));
});

gulp.task('js', () => {
    return gulp.src('./js/draft.js')
        .pipe(strip())
        .pipe(removeUseStrict())
        .pipe(ugly())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('./js'));
});

gulp.task('img', () => {
    return gulp.src(['./images/*.svg', './images/*.jpg'])
        .pipe(img())
        .pipe(gulp.dest('./images'));
});

gulp.task('watch', () => {
    gulp.watch('./css/style.css', ['css']);
    gulp.watch('./js/app.js', ['js']);
});