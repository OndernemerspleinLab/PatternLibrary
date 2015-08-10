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
                configFile: './grunt/karma.conf.js'
            }
        },

        copy: {
			globalScript: {
				files: [
					{ expand: true, cwd: './source/js/', src: ['globalBundled.js', 'globalBundled.js.map'], dest: './public/js/'},
				]
			},
			scriptSource: {
				files: [
					{ expand: true, cwd: './source/jsSource/', src: ['**/*.js'], dest: './public/js/'},
				]
			},
		},

		watch: {
			js: {
				options: {
					livereload: true
				},
				files: ['source/jsSource/**/*.js'],
				tasks: ['scripts'],

			},
			karma: {
				options: {
					livereload: true
				},
				files: ['source/jsTest/**/*Spec.js'],
				tasks: ['karma:unit'],

			},
		},
	};

	grunt.config.merge(config);

	if (devOrProd === "dev") {
		scriptsTasks = "devScripts";
	} else if (devOrProd === "prod") {
		scriptsTasks = "prodScripts";
	} else {
		grunt.fail.fatal('devOrProd variable not properly set.');
	}

	grunt.registerTask('prodScripts', ['karma:unit', 'bundleJspm:production', 'copy:globalScript']);
	grunt.registerTask('devScripts', ['karma:unit', 'copy:scriptSource']);
	grunt.registerTask('scripts', [scriptsTasks]);
};