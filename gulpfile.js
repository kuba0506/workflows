/**
 * REQUIRED PLUGINS
 */
var gulp = require('gulp'),
	gutil = require('gulp-util'), //dodatkowe narzędzia jak log
	coffee = require('gulp-coffee');

/**
 * Sources
 */
var projectResources = ['components/coffee/*.coffee',
'components/scripts'];

//Proste logowanie
gulp.task('log', function () {
	gutil.log('Gulp działa!!');
});

//CoffeScript do JS
gulp.task('coffee', function () {
	gulp.src(projectResources[0])
		.pipe(coffee({ bare: true })
			.on('error', gutil.log)) //zapobiega wysypaniu się reszty zadań w przypadku błedu w kodzie
			.pipe(gulp.dest(projectResources[1])) 
});