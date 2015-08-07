module.exports = function(grunt) {
	grunt.registerMultiTask('bundleJspm', 'Bundle JSPM', function() {
		var bundleFunction;
		var jspm = require("jspm");

  		var done = this.async();
  		var options = this.options({
  			dest: undefined,
  			expression: undefined,
  			mangle: false,
  			minify: false,
  			sourceMaps: true,
			lowResSourceMaps: false,
			inject: false,
			selfExecuting: true,
  		});

  		if (!options.dest || !options.expression) {
  			return done();
  		}

  		if (options.selfExecuting) {
  			bundleFunction = jspm.bundleSFX;
  		} else {
  			bundleFunction = jspm.bundle;
  		}


		bundleFunction(options.expression, options.dest, {
  			sourceMaps: options.sourceMaps,
  			lowResSourceMaps: options.lowResSourceMaps,
  			inject: options.inject,
  			mangle: options.mangle,
			minify: options.minify,
  		}).then(done, function (err) {
	  		grunt.log.error("build faled");
  			console.log(err);
  		});
	});
};