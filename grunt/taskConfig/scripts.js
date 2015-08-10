module.exports = function(grunt) {
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
				expression: 'start',
				dest: 'source/js/global.js',
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
					{ expand: true, cwd: './source/js/', src: ['global.js', 'global.js.map'], dest: './public/js/'},
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
				tasks: ['devScripts'],

			},
		},
	};

	grunt.config.merge(config);

	grunt.registerTask('devBundleScripts', ['jshint:scripts', 'karma:unit', 'bundleJspm:development', 'copy:globalScript']);
	grunt.registerTask('prodScripts', ['karma:unit', 'bundleJspm:production', 'copy:globalScript']);
	grunt.registerTask('devScripts', ['karma:unit', 'copy:scriptSource']);
};