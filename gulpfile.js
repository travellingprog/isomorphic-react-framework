'use strict';

var gulp = require('gulp');

gulp.task('default', ['clean', 'html']);

gulp.task('clean', function () {
	var del = require('del');
	return del.sync(['dist/**/*']);
});

gulp.task('html', function () {
	var babel = require('gulp-babel');
	
	return gulp
		.src('src/components/**/*.jsx')
		.pipe(babel({
			presets: ['react', 'es2015']
		}))
		.pipe(gulp.dest('dist'));
	// var data = require('gulp-data'),
	// 	fm = require('gulp-front-matter'),
	// 	nunjucksRender = require('gulp-nunjucks-render'),
	// 	rename = require('gulp-rename'),
	// 	requireGlob = require('require-glob');

	// nunjucksRender.nunjucks.configure(['src/markup/partials/'], {watch: false});
	// var dataObj = requireGlob.sync('./src/data/**/*.{js,json}');

	// return gulp
	// 	.src('src/markup/pages/**/*.nunjucks')
	// 	.pipe(data(function() {
	// 		return dataObj;
	// 	}))
	// 	.pipe(fm({property: 'data.frontMatter'}))
	// 	.pipe(nunjucksRender())
	// 	.pipe(rename(function (path) {
	// 		var dirNameArray = path.dirname.split('/');
	// 		path.dirname = dirNameArray.slice(1).join('/');
	// 		path.extname = '.html';
	// 		return path;
	// 	}))
	// 	.pipe(gulp.dest('./dist/'));
});
