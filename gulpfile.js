const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const autoprefixer = require('gulp-autoprefixer');
const cssbeautify = require('gulp-cssbeautify');
const nodemon = require('gulp-nodemon');

gulp.task('sass', function () {
	gulp.src('./sass/app.sass')
	.pipe(sass())
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(cssbeautify({
		indent: '    ',
		autosemicolon: true
	}))
	.pipe(gulp.dest('./public/stylesheets'))
	.pipe(reload({stream: true}))
	.on('error', gutil.log);
});

gulp.task('nodemon', function(done){
	let running = false;

	return nodemon({
		script: 'server.js',
		exec: 'babel-node --presets es2015',
		ext: 'js handlebars',
	}).on('start', function() {
		if (!running) {
			done();
		}
		running = true;
	}).on('restart', function() {
		setTimeout(function() {
			reload();
		}, 500);
	});
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: 'http://localhost:3000/',
		port: 4000,
		notify: false
	});
});

gulp.task('serve', ['browser-sync'], function() {
	gulp.watch('./sass/**/*.*', ['sass']);
	gulp.watch('./public/stylesheets/css/**/*.*').on('change', reload);
	gulp.watch('./public/javascripts/**/*.*').on('change', reload);
});

gulp.task('default', ['sass', 'serve']);