'use strict';

const gulp         = require('gulp'),
			sass         = require('gulp-sass'),
			plumber      = require('gulp-plumber'),
			postcss      = require('gulp-postcss'),
			autoprefixer = require('autoprefixer'),
			stripCss     = require('gulp-strip-css-comments'),
			strip        = require('gulp-strip-comments'),
			uglifyCss    = require('gulp-uglifycss'),
			uglify       = require('gulp-uglify'),
			imagemin     = require('gulp-imagemin'),
			imgCompress  = require('imagemin-jpeg-recompress'),
			responsive   = require('gulp-responsive'),
			webp         = require('gulp-webp'),
			newer        = require('gulp-newer'),
			pug          = require('gulp-pug'),
			bwsync       = require('browser-sync').create();

const path = {
						build: {
							html:   'dev/',
							css:    'dev/css/',
							js:     'dev/js/',
							img:    'dev/img/',
							imgx1:  'dev/img/wx1/',
							imgx2:  'dev/img/wx2/',
							imgx3:  'dev/img/wx3/',
							font:   'dev/fonts/'
						},
						src: {
							pug:  ['src/pug/**/*.pug',
										'!src/pug/includes/**'],
							css:   'src/scss/style.scss',
							js:   ['src/js/*.js',],
							img:  ['src/img/**/*.jpg',
										 'src/img/**/*.svg',
										 'src/img/**/*.png'],
							img2: ['src/img/**/*.jpg',
										 'src/img/**/*.png'],
							font:  'src/fonts/**/*.*'
						},
						watch: {
							dev:   'src',
							pug:   'src/pug/**/*.pug',
							css:   'src/scss/**/*.scss',
							js:    'src/js/*.js',
							img:  ['src/img/**/*.jpg',
										 'src/img/**/*.svg',
										 'src/img/**/*.png'],
							font:  'src/fonts/*.*'
						},
					};

gulp.task('serv', function() {
	bwsync.init({
		server: {
			baseDir: './dev',
			notify: false,
		}
	});
	bwsync.watch(path.watch.dev, bwsync.reload);
});

gulp.task('pug', function () {
	return gulp.src(path.src.pug)
		.pipe(pug({
			pretty:true
		}))
		.pipe(gulp.dest(path.build.html))
		.pipe(bwsync.stream());
});

gulp.task('font', function() {
	return gulp.src(path.src.font)
		.pipe(plumber())
		.pipe(newer(path.build.font))
		.pipe(gulp.dest(path.build.font))
		.pipe(bwsync.stream());
});

gulp.task('style', function() {
	return gulp.src(path.src.css)
		.pipe(plumber())
		.pipe(sass())
		.pipe(postcss([
			autoprefixer({
				overrideBrowserslist: ['last 10 versions']
			})
		]))
		.pipe(stripCss())
		.pipe(uglifyCss())
		.pipe(gulp.dest(path.build.css))
		.pipe(bwsync.stream());
});

gulp.task('js', function () {
	return gulp.src(path.src.js)
		.pipe(plumber())
		.pipe(strip())
		// .pipe(uglify())
		.pipe(gulp.dest(path.build.js));
});

gulp.task('imgx3', function() {
	return gulp.src(path.src.img)
		.pipe(plumber())
		.pipe(newer(path.build.imgx3))
		.pipe(imagemin([
			imgCompress({
				progressive: true,
				min: 70,
				max: 90,
				quality: 'high'
			}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]
			})
		]))
		.pipe(webp({quality: 70}))
		.pipe(gulp.dest(path.build.imgx3));
});

gulp.task('imgx2', function() {
	return gulp.src(path.src.img2)
		.pipe(plumber())
		.pipe(newer(path.build.imgx2))
		.pipe(responsive({
			'*': [{
				width: '50%',
				quality: 100,
				rename: { prefix: 'wx2/', },
			}]
		}))
		.pipe(webp({quality: 70}))
		.pipe(gulp.dest(path.build.img));
});

gulp.task('imgx1', function() {
	return gulp.src(path.src.img2)
		.pipe(plumber())
		.pipe(newer(path.build.imgx1))
		.pipe(responsive({
			'*': [{
				width: '33.33%',
				quality: 90,
				rename: { prefix: 'wx1/', },
			}]
		}))
		.pipe(webp({quality: 70}))
		.pipe(gulp.dest(path.build.img));
});

gulp.task('watch', function() {
	gulp.watch(path.watch.pug, gulp.series('pug'));
	gulp.watch(path.watch.css, gulp.series('style'));
	gulp.watch(path.watch.js, gulp.series('js'));
	gulp.watch(path.watch.font, gulp.series('font'));
	gulp.watch(path.watch.img, gulp.series(
		gulp.parallel('imgx3', 'imgx2', 'imgx1')
		));
});


gulp.task('default', gulp.series(
	gulp.parallel('watch', 'serv')
));