'use strict';

var gulp = require('gulp'),
	del = require('del');

var distFolder = 'dist'
var tempFolder = '.tmp'


gulp.task('default', ['watch']);

gulp.task('clean', function () {
	var distTarget = distFolder + '/**/*';
	return del.sync([distTarget, tempFolder]);
});

// HTML-rendering tasks
gulp.task('html', ['html:react'], function () {
	// Delete temporary folder created by html:react
	return del.sync([tempFolder]);
});

gulp.task('html:react', ['clean'], function (cb) {
	var babel = require('gulp-babel'),
		data = require('gulp-data'),
		reactToHTML = require('./gulp-react-to-html.js'),
		requireGlob = require('require-glob');

	var dataObj = requireGlob.sync('./src/data/**/*.{js,json}');
	
	return gulp
		.src('src/components/**/*.jsx')
		.pipe(babel({
			presets: ['react', 'es2015']

		}))
		.pipe(data(function() {
			return dataObj;
		}))
		.pipe(gulp.dest(tempFolder)) // needed for reactToHTML()
		.pipe(reactToHTML())
		.pipe(gulp.dest(distFolder))
});

// Watch task
gulp.task('watch', ['html'], function () {
	var watcher = gulp.watch('src/components/**/*.jsx', ['html']);
	watcher.on('change', function(event) {
	  console.log('File ' + event.path + ' was ' + event.type + '...');
	});
});
