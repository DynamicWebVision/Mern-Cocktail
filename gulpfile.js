var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('default', function(){
    return browserify('./src/App.js')
        .transform(babelify, {presets: "react"})
        .bundle()
        .pipe(source('App.js'))
        .pipe(gulp.dest('./static/'));
})