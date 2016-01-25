var gutil = require('gulp-util');
var replaceExt = require('replace-ext');
var through = require('through2');
var React = require('react');
var ReactDOMServer = require('react-dom/server');

var PluginError = gutil.PluginError;
var PLUGIN_NAME = 'gulp-react-to-html';

function gulpReactToHTML() {

	var stream = through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			this.emit('error', new PluginError(PLUGIN_NAME, 'Input file is null!'));
			return cb();
		}

		if (file.isStream()) {
			this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
			return cb();
		}

		if (file.isBuffer()) {
			// delete Node require.cache for this file first, or Node will not
			// load the updates for this file after a gulp.watch trigger
			delete require.cache[file.path];

			var reactClass = require(file.path).default;
			var reactElement = React.createElement(reactClass, file.data);
			var elementStr = ReactDOMServer.renderToString(reactElement);
			file.contents = new Buffer(elementStr);
			file.path = replaceExt(file.path, '.html');
			this.push(file);
		}

		cb();
	});

	return stream;
}

module.exports = gulpReactToHTML;