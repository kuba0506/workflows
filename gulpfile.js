/**
 * REQUIRED PLUGINS
 */
var gulp = require('gulp'),
	gutil = require('gulp-util'); //dodatkowe narzędzia jak log

gulp.task('log', function () {
	gutil.log('Gulp działa!!');
});