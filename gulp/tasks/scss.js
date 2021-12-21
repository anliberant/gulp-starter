const sass = require('gulp-sass')(require('sass'));

const app = require('../config/app');
const path = require('../config/path');

const scss = () => {
	return $.gulp
		.src($.path.scss.src, { sourcemaps: $.app.isDev })
		.pipe(
			$.gp.plumber({
				errorHandler: $.gp.notify.onError((error) => ({
					title: 'SCSS',
					message: 'Error: ' + error.message,
				})),
			}),
		)
		.pipe($.gp.sassGlob())
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe($.gp.webpCss())
		.pipe($.gp.autoprefixer())
		.pipe($.gp.groupCssMediaQueries())
		.pipe($.gp.size({ title: 'main.css ' }))
		.pipe($.gulp.dest($.path.scss.dest, { sourcemaps: $.app.isDev }))
		.pipe($.gp.rename({ suffix: '.min' }))
		.pipe($.gp.csso())
		.pipe($.gp.size({ title: 'main.min.css ' }))
		.pipe($.gulp.dest($.path.scss.dest, { sourcemaps: $.app.isDev }))
		.pipe($.browserSync.stream());
};

module.exports = scss;
