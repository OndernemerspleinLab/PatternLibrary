module.exports = function(grunt, devOrProd) {
	var config = {
		jshint: {
			scripts: {
				options: {
					jshintrc: true,
				},
				files: [{
					cwd: './source/jsSource/',
					expand: true,
					src: ['**/*.js', '!jspm_packages/**'],
				}],
			},
		},

		bundleJspm: {
			options: {
				expression: 'global',
				dest: 'source/js/globalBundled.js',
				sourceMaps: true,
				lowResSourceMaps: false,
				inject: false,
			},
			development: {
				options: {
					minify: false,
					mangle: false,
				}
			},
			production: {
				options: {
					minify: true,
					mangle: true,
				}
			},
		},

		karma: {
			unit: {
				configFile: './grunt/karma.conf.js',
				options: {
					singleRun: true,
				},
			},
			coverage: {
				configFile: './grunt/karma.coverage.conf.js',
				options: {
					singleRun: true,
				},
			},
			background: {
				configFile: './grunt/karma.conf.js',
				options: {
					background: true,
					singleRun: false,
				},
			},
			serve: {
				configFile: './grunt/karma.conf.js',
				options: {
					background: false,
					singleRun: false,
				},
			},
			watch: {
				configFile: './grunt/karma.conf.js',
				options: {
					singleRun: false,
				},
			},
        },

        copy: {
			globalScript: {
				files: [
					{ expand: true, cwd: './source/js/', src: ['globalBundled.js', 'globalBundled.js.map'], dest: './public/js/'},
				],
			},
			scriptSource: {
				files: [
					{ expand: true, cwd: './source/jsSource/', src: ['**/*.js'], dest: './public/js/'},
				],
			},
		},

		watch: {
			js: {
				options: {
					livereload: true,
				},
				files: ['source/jsSource/**/*.js', '!source/jsSource/jspm_packages/**'],
				tasks: ['scripts'],

			},
			tests: {
				options: {
					livereload: false,
				},
				files: ['source/jsSource/**/*.js', '!source/jsSource/jspm_packages/**', 'source/jsTest/**/*.js'],
				tasks: ['tests'],
			},
		},
	};

	grunt.config.merge(config);

	var scriptsTasks;

	if (devOrProd === "dev") {
		scriptsTasks = "devScripts";
	} else if (devOrProd === "prod") {
		scriptsTasks = "prodScripts";
	} else {
		grunt.fail.fatal('devOrProd variable not properly set.');
	}

	grunt.registerTask('coverage', ['karma:coverage']);
	grunt.registerTask('tests', ['karma:unit', 'jshint:scripts']);
	grunt.registerTask('watchTests', ['karma:background', 'watch:tests']);
	grunt.registerTask('prodScripts', ['tests', 'bundleJspm:production', 'copy:globalScript']);
	grunt.registerTask('devScripts', ['copy:scriptSource']);
	grunt.registerTask('scripts', [scriptsTasks]);
};