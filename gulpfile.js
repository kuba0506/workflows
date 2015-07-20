/**
 * REQUIRED PLUGINS
 */
var gulp = require('gulp'),
	gutil = require('gulp-util'), //dodatkowe narzędzia jak log
	coffee = require('gulp-coffee'),
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
	];

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
gulp.task('js', function () {
	gulp.src(jsSources)
	.pipe(concat('script.js'))
	.pipe(minify())
	.pipe(gulp.dest('builds/development/js'))
});