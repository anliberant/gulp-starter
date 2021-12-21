global.$ = {
	gulp: require('gulp'),
	gp: require('gulp-load-plugins')(),
	browserSync: require('browser-sync').create(),
	path: require('./gulp/config/path'),
	app: require('./gulp/config/app'),
};
const requireDir = require('require-dir');
const tasks = requireDir('./gulp/tasks', { recurse: true });

const watcher = () => {
	$.gulp.watch($.path.html.watch, tasks.html);
	$.gulp.watch($.path.pug.watch, tasks.pug);
	$.gulp.watch($.path.scss.watch, tasks.scss);
	$.gulp.watch($.path.js.watch, tasks.js);
	$.gulp.watch($.path.img.watch, tasks.img);
	$.gulp.watch($.path.fonts.watch, tasks.fonts);
};
const build = $.gulp.series(
	tasks.clear,
	$.gulp.parallel(tasks.pug, tasks.scss, tasks.js, tasks.img, tasks.fonts),
);
const dev = $.gulp.series(build, $.gulp.parallel(tasks.server, watcher));

exports.html = tasks.html;
exports.pug = tasks.pug;
exports.css = tasks.css;
exports.scss = tasks.scss;
exports.js = tasks.js;
exports.img = tasks.img;
exports.fonts = tasks.fonts;

exports.watch = watcher;
exports.build = build;
exports.dev = dev;

exports.default = $.app.isProd ? build : dev;
