const webpack = require('webpack-stream');
const pipeline = require('readable-stream').pipeline;

const js = () => {
	return pipeline(
		$.gulp.src($.path.js.src, { sourcemaps: $.app.isDev }),
		$.gp.plumber({
			errorHandler: $.gp.notify.onError((error) => ({
				title: 'JS',
				message: 'Error: ' + error.message,
			})),
		}),
		$.gp.babel(),
		webpack($.app.webpack),
		$.gulp.dest($.path.js.dest, { sourcemaps: $.app.isDev }),
		$.browserSync.stream(),
	);
};

module.exports = js;
