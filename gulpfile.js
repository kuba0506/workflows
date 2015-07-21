/**
 * REQUIRED PLUGINS
 */
var gulp = require('gulp'),
	gutil = require('gulp-util'), //dodatkowe narzędzia jak log
	coffee = require('gulp-coffee'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	concat  = require('gulp-concat'),
	minify = require('gulp-uglify');

/**
 * Sources
 */
var coffeeSources = [
	'components/coffee/*.coffee',
	'components/scripts'
	],

	jsSources = [
	'components/scripts/rclick.js',
	'components/scripts/pixgrid.js',
	'components/scripts/tagline.js',
	'components/scripts/template.js'
	],

	sassSources = ['components/sass/style.scss'];

//Proste logowanie
gulp.task('log', function () {
	gutil.log('Gulp działa!!');
});

//CoffeScript do JS
gulp.task('coffee', function () {
	gulp.src(coffeeSources[0])
		.pipe(coffee({ bare: true })
			.on('error', gutil.log)) //zapobiega wysypaniu się reszty zadań w przypadku błedu w kodzie
			.pipe(gulp.dest(coffeeSources[1])) 
});

//Łączenie JS
gulp.task('js',function () {
	gulp.src(jsSources)
	.pipe(concat('script.js'))
	.pipe(browserify())
	.pipe(gulp.dest('builds/development/js'))
	// .pipe(minify())
});

//Sass do CSS
gulp.task('sass', function () {
	gulp.src(sassSources)
	.pipe(compass({
		sass: 'components/sass/',
		image:'builds/development/images',
		style: 'compact'
	})
	.on('error', gutil.log))
	.pipe(gulp.dest('builds/development/css'))
});


/**
 * Default task
 */
gulp.task('default', ['coffee', 'js', 'sass', 'watch']);


/**
 * Watch task
 */
gulp.task('watch', function () {
	gulp.watch(coffeeSources, ['coffee', 'js']);
	gulp.watch(jsSources, ['js']);
	gulp.watch('components/sass/*.scss', ['sass']);
});