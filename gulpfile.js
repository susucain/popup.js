var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');

gulp.task('minify', function () {
	gulp.src('src/popup.js')
	    .pipe(uglify())
        .pipe(rename('popup.min.js'))
        .pipe(gulp.dest('dist'))
});

gulp.task('minify-css', function() {
	gulp.src('src/popup.css')
	    .pipe(cleanCSS({compatibility: 'ie9'}))
        .pipe(rename('popup.min.css'))
	    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['minify', 'minify-css']);
