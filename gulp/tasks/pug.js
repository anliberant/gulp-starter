const app = require('../config/app');
const path = require('../config/path');

const pug = () => {
	return $.gulp
		.src($.path.pug.src)
		.pipe(
			$.gp.plumber({
				errorHandler: $.gp.notify.onError((error) => ({
					title: 'PUG',
					message: 'Error: ' + error.message,
				})),
			}),
		)
		.pipe($.gp.pug($.app.pug))
		.pipe($.gp.webpHtml())
		.pipe($.gulp.dest($.path.pug.dest))
		.pipe($.browserSync.stream());
};

module.exports = pug;
