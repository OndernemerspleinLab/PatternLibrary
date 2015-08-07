var path = require("path");
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			scss: { //scss can be watched if you like
				options: {
					livereload: true
				},
				files: ['source/css/**/*.scss', 'public/styleguide/css/*.scss'],
				tasks: ['styles'],
			},
			js: { //scss can be watched if you like
				options: {
					livereload: true
				},
				files: ['source/jsSource/**/*.js'],
				tasks: ['scripts'],
			},
			svgFigures: { //scss can be watched if you like
				options: {
					livereload: true
				},
				files: ['source/svgSource/**/*.svg'],
				tasks: ['default'],
			},
			iconFont: {
				options: {
					livereload: true
				},
				files: [
					'source/iconFontSource/**/*.svg',
					'source/iconFontSource/template.css',
					'source/iconFontSource/demoTemplate.html',
				],
				tasks: ['styles'],
			},
			all: {
				options: {
					livereload: true
				},
				files: [
				'source/_patterns/**/*.mustache',
				'source/_patterns/**/*.json',
				'source/_data/*.json'
				],
				tasks: ['default']
			},
			images: {
				options: {
					livereload: true
				},
				files: [
					'source/images/**/*.png',
					'source/images/**/*.jpg',
					'source/images/**/*.gif',
					'source/images/**/*.jpeg',
					'source/images/**/*.svg',
				],
				tasks: ['copy:images'],

			}
		},
		modernizr_builder: {
			build: {
				options: {
					config: './grunt/modernizrConfig.json',
					dest: './source/jsSource/utils/modernizr.js',
				},
			},
		},
		clean: {
			options: { force: true },
			files: ['./public/patterns', './fonts/iconFont']
		},

		babel: {
			options: {
				stage: 0,
				sourceMap: true,
			},
			development: {
				cwd: './source/jsSource/',
				src: '*.js',
				dest: './source/js/',
				expand: true,
			}
		},
		copy: {
			svgDemo: {
			},
			script: {
				files: [
					{ expand: true, cwd: './source/js/', src: 'global.js', dest: './public/js/'},
				]
			},
			style: {
				files: [
					{ expand: true, cwd: './source/css/', src: '*.css', dest: './public/css/' },
				]
			},
			images: {
				files: [
					{ expand: true, cwd: './source/images/', src: ['**/*.png', '**/*.jpg', '**/*.gif', '**/*.jpeg', '**/*.svg'], dest: './public/images/' },
				]
			},
			main: {
				files: [
					{ expand: true, cwd: './source/fonts/', src: '**', dest: './public/fonts/'},
					{ expand: true, cwd: './source/_data/', src: 'annotations.js', dest: './public/data/' }
				]
			}
		},
		jshint: {
			options: {
				"curly": true,
				"eqnull": true,
				"eqeqeq": true,
				"undef": true,
				"forin": true,
				//"unused": true,
				"node": true
			},
			patternlab: ['Gruntfile.js', './builder/lib/patternlab.js']
		},
		sass: {
			build: {
				options: {
					sourceMap: true,
					sourceMapContents: true,
					style: 'expanded',
					precision: 8
				},
				files: {
					'./source/css/style.css': './source/css/style.scss',
					'./public/styleguide/css/static.css': './public/styleguide/css/static.scss',
					'./public/styleguide/css/styleguide.css': './public/styleguide/css/styleguide.scss',
					'./public/styleguide/css/styleguide-specific.css': './public/styleguide/css/styleguide-specific.scss'
				}
			}
		},
		postcss: {
			build: {
				options: {
					map: {
						inline: false,
						prev: './source/css/'
					},
					processors: [
						require("pixrem")(),
						require("autoprefixer-core")({ browsers: ['> 5% in NL', 'last 2 versions']}),
					]
				},
				files: {
					'./source/css/style.css': './source/css/style.css',
					'./public/styleguide/css/static.css': './public/styleguide/css/static.css',
					'./public/styleguide/css/styleguide.css': './public/styleguide/css/styleguide.css',
					'./public/styleguide/css/styleguide-specific.css': './public/styleguide/css/styleguide-specific.css',
				},
			},
		},
		svgstore: {
			options: {
				prefix: 'figures-',
				includedemo: grunt.file.read('./source/svgSource/template.html'),
				cleanup: true,
			},
			main: {
				files: {
					'./source/_patterns/00-atoms/04-images/figures.mustache': './source/svgSource/**/*.svg',
				},
			},
		},

		rename: {
			svgFigures: {
				files: {
					'./source/_patterns/00-atoms/04-images/01-figures-demo.mustache':
							'./source/_patterns/00-atoms/04-images/figures.mustache-demo.html',
				}
			},
		},
		nodeunit: {
			all: ['test/*_tests.js'],
		},
		connect: {
			app:{
				options: {
					port: 9001,
					base: './public',
					hostname: 'localhost',
					open: true,
					livereload: 35729,
				},
			},
		},
		webfont: {
			options: {
				hashes: false,
				fontFilename: "icons-{hash}",
				relativeFontPath: "../fonts/iconFont/",
				engine: "node",
				stylesheet: "scss",
				template: "source/iconFontSource/template.css",
				htmlDemo: true,
				htmlDemoTemplate: "source/iconFontSource/demoTemplate.html",
				types: ["eot", "woff", "ttf", "svg"],
				rename: function (name) {
					var parsedPath = path.parse(name);
					parsedPath.ext = "";
					parsedPath.base = parsedPath.name;
					name = path.format(parsedPath);
					name = name.replace("\\", "/");
					name = name.replace(/^\/?source\/iconFontSource\//, "");
					name = name.replace(/[^\/A-z\-_0-9]/g, "-");
					return name;
				},
				templateOptions: {
					"objectName": "$iconKeyCodes",
					"functionName": "getIcon",
					"baseClass": "icon",
					"classPrefix": "icon-",
					"mixinPrefix": "icon-",
				},
				destHtml: 'source/iconFontSource/',
			},
			build: {
				src: ['source/iconFontSource/**/*.svg'],
				dest: 'source/fonts/iconFont/',
				destCss: 'source/css/scss/iconFont/',
			}
		},
		buildcontrol: {
			'gh-pages': {
				options: {
					dir: 'public',
					commit: true,
					push: true,
		            message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%',
					remote: 'https://github.com/OndernemerspleinLab/PatternLibrary.git',
					branch: 'gh-pages',
				},
			},
		},

		bundleJspm: {
			development: {
				options: {
		  			expression: 'start',
		  			dest: 'source/js/global.js',
		  			sourceMaps: true,
					lowResSourceMaps: false,
					inject: false
				}
			},
		},

		karma: {
            unit: {
                configFile: './grunt/karma.conf.js'
            }
        }
	});

	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	//load the patternlab task
	grunt.task.loadTasks('./builder/');
	grunt.task.loadTasks('./grunt/tasks/');

	grunt.registerTask('styles', ['webfont', 'sass', 'postcss', 'copy:style']);
	grunt.registerTask('bundleScripts', ['bundleJspm:development']);
	grunt.registerTask('scripts', ['bundleScripts', 'copy:script']);
	grunt.registerTask('copyToPublic', ['copy:main', 'copy:images']);
	grunt.registerTask('svgFigures', ['svgstore', 'rename:svgFigures']);

	//if you choose to use scss, or any preprocessor, you can add it here
	grunt.registerTask('default', ['clean', 'svgFigures', 'patternlab', 'styles', 'scripts', 'copyToPublic']);

	// Deploy to GitHub Pages
	grunt.registerTask('deploy', ['default', 'buildcontrol:gh-pages']);

	grunt.registerTask('serve', ['default', 'connect', 'watch']);
	grunt.registerTask('modernizr', ['modernizr_builder']);

	// git subtree push --prefix public/ origin gh-pages
};