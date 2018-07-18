const gulp = require('gulp');
const ugly = require('gulp-uglify');
const clean = require('gulp-clean-css');
const rename = require('gulp-rename');
const img = require('gulp-imagemin');

gulp.task('css', () => {
    return gulp.src('./css/*.css')
        .pipe(clean({compatibility: 'ie8'}))
        .pipe(rename('bundle.css'))
        .pipe(gulp.dest('./css'));
});

gulp.task('js', () => {
    return gulp.src('./js/app.js')
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('./js'));
});

gulp.task('img', ()=>{
    return gulp.src(['./images/*.svg','./images/*.jpg'])
        .pipe(img())
        .pipe(gulp.dest('./images'));
});

gulp.task('watch', ()=>{
    gulp.watch('./css/style.css', ['css']);r
})