/**
 * REQUIRED PLUGINS
 */
var gulp = require('gulp'),
	gutil = require('gulp-util'), //dodatkowe narzędzia jak log
	coffee = require('gulp-coffee'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	concat  = require('gulp-concat'),
	gulpif  = require('gulp-if'),
	connect  = require('gulp-connect'), //tworzy serwer
	uglify = require('gulp-uglify');

/**
 * Deklaracja zmienny odzielona od inicjalizacji
 * aby później można ich użyć warunkowo, np. outputDir
 */
var env,
	coffeeSources,
	jsSources,
	sassSources,
	htmlSources,
	jsonSources,
	outputDir,
	sassStyle;

/**
 * Zmienna środowiskowa ustalenie czy pracujemy nad 
 * 'development' czy 'production'
 * NODE_ENV=production gulp - odpalenie jako produkcja
 * w Windows:
 * SET NODE_ENV=production
 * gulp
 */
env = process.env.NODE_ENV || 'development';

/**
 * Wybór środowiska pracy
 */

if (env === 'development')  {
	outputDir = 'builds/development/';
	sassStyle = 'compact';
} else {
	outputDir = 'builds/production/';
	sassStyle = 'compressed';
}

/**
 * Sources
 */
	coffeeSources = [
	'components/coffee/*.coffee',
	'components/scripts'
	],

	jsSources = [
	'components/scripts/rclick.js',
	'components/scripts/pixgrid.js',
	'components/scripts/tagline.js',
	'components/scripts/template.js'
	],

	sassSources = ['components/sass/style.scss'],

	htmlSources = [ outputDir + '*.html'],

	jsonSources = [ outputDir + 'js/*.json'];

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
	.pipe(gulpif(env === 'production', uglify()))
	.pipe(gulp.dest(outputDir + 'js'))
	.pipe(connect.reload())
});

//Sass do CSS
gulp.task('sass', function () {
	gulp.src(sassSources)
	.pipe(compass({
		sass: 'components/sass/',
		image: outputDir + 'images',
		css: outputDir + 'css',
		style: sassStyle
	})
	.on('error', gutil.log))
	.pipe(gulp.dest(outputDir + 'css'))
	.pipe(connect.reload())
});

//Serwer - connect
gulp.task('connect', function () {
	connect.server({
		root: outputDir,
		livereload: true
	});
});

//Html
gulp.task('html', function () {
	gulp.src(htmlSources)
	.pipe(connect.reload())
});

//JSON
gulp.task('json', function () {
	gulp.src(jsonSources)
	.pipe(connect.reload())
});


// ////////////////////////////////////////////////
// Build Task
// // /////////////////////////////////////////////
//usuwa wszystko za katalogu build
// gulp.task('build:cleanfolder', function(callback) {
// 	del([
// 		'build/**'
// 	], callback);
// });

// //buduje katalog na wszystkie pliki
// gulp.task('build:copy' , ['build:cleanfolder'],  function(){
// 	return gulp.src('app/**/*')
// 	.pipe(gulp.dest('build'));
// });

// //usuwa niepotrzebe pliki z katalogu build
// gulp.task('build:remove' ,['build:copy'] ,function(callback) {
// 	del([
// 		'build/styles/',
// 		'build/js/!(*.min.js)'
// 		], callback);
// });

// gulp.task('build', ['build:copy', 'build:remove']);





/**
 * Watch task
 */
gulp.task('watch', function () {
	gulp.watch(htmlSources, ['html']);
	gulp.watch(jsonSources, ['json']);
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js']);
	gulp.watch('components/sass/*.scss', ['sass']);
});

/**
 * Default task
 */
gulp.task('default', ['html','json', 'coffee', 'js', 'sass', 'connect', 'watch']);
