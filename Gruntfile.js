var path = require("path");
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			options: { force: true },
			files: ['./public/patterns']
		},
		copy: {
			main: {
				files: [
				{ expand: true, cwd: './source/js/', src: '*', dest: './public/js/'},
				{ expand: true, cwd: './source/css/', src: '*.css', dest: './public/css/' },
				{ expand: true, cwd: './source/images/', src: ['*.png', '*.jpg', '*.gif', '*.jpeg'], dest: './public/images/' },
				{ expand: true, cwd: './source/images/sample/', src: ['*.png', '*.jpg', '*.gif', '*.jpeg'], dest: './public/images/sample/'},
				{ expand: true, cwd: './source/fonts/', src: '*', dest: './public/fonts/'},
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
		watch: {
			scss: { //scss can be watched if you like
				options: {
					livereload: true
				},
				files: ['source/css/**/*.scss', 'public/styleguide/css/*.scss'],
				tasks: ['default']
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
			}
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
				prefix: 'icon-',
				includedemo: true,
				cleanup: true,
			},
			main: {
				files: {
					'./svg-out/icons.svg': './svg/**/*.svg',
				},
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
	});

	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	//load the patternlab task
	grunt.task.loadTasks('./builder/');

	grunt.registerTask('styles', ['webfont', 'sass', 'postcss']);

	//if you choose to use scss, or any preprocessor, you can add it here
	grunt.registerTask('default', ['clean', 'patternlab', 'styles', 'copy']);

	// Deploy to GitHub Pages
	grunt.registerTask('deploy', ['default', 'buildcontrol:gh-pages']);

	grunt.registerTask('serve', ['default', 'connect', 'watch']);

	// git subtree push --prefix public/ origin gh-pages
};