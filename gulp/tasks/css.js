const css = () => {
	return $.gulp
		.src($.path.css.src, { sourcemaps: $.app.isDev })
		.pipe(
			$.gp.plumber({
				errorHandler: $.gp.notify.onError((error) => ({
					title: 'CSS',
					message: 'Error: ' + error.message,
				})),
			}),
		)
		.pipe($.gp.concat('main.css'))
		.pipe($.gp.cssimport())
		.pipe($.gp.webpCss())
		.pipe($.gp.autoprefixer())
		.pipe($.gp.groupCssMediaQueries())
		.pipe($.gp.size({ title: 'main.css ' }))
		.pipe($.gulp.dest($.path.css.dest, { sourcemaps: $.app.isDev }))
		.pipe($.gp.rename({ suffix: '.min' }))
		.pipe($.gp.csso())
		.pipe($.gp.size({ title: 'main.min.css ' }))
		.pipe($.gulp.dest($.path.css.dest, { sourcemaps: $.app.isDev }))
		.pipe($.browserSync.stream());
};

module.exports = css;