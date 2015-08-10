var path = require("path");

module.exports = function(grunt) {
	var config = {
		style: {
			files: [
				{ expand: true, cwd: './source/css/', src: ['*.css', '*.css.map'], dest: './public/css/' },
			]
		},
		sass: {
			development: {
				options: {
					sourceMap: true,
					sourceMapContents: true,
					outputStyle: 'expanded',
					precision: 8,
				},
				files: {
					'./source/css/style.css': './source/css/style.scss',
					'./public/styleguide/css/static.css': './public/styleguide/css/static.scss',
					'./public/styleguide/css/styleguide.css': './public/styleguide/css/styleguide.scss',
					'./public/styleguide/css/styleguide-specific.css': './public/styleguide/css/styleguide-specific.scss'
				},
			},
			production: {
				options: {
					sourceMap: true,
					sourceMapContents: true,
					outputStyle: 'compressed',
					precision: 8,
				},
				files: {
					'./source/css/style.css': './source/css/style.scss',
					'./public/styleguide/css/static.css': './public/styleguide/css/static.scss',
					'./public/styleguide/css/styleguide.css': './public/styleguide/css/styleguide.scss',
					'./public/styleguide/css/styleguide-specific.css': './public/styleguide/css/styleguide-specific.scss'
				},
			},
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
		copy: {
			style: {
				files: [
					{ expand: true, cwd: './source/css/', src: ['*.css', '*.css.map'], dest: './public/css/' },
					{ expand: true, cwd: './source/fonts/', src: '**', dest: './public/fonts/'},
				]
			},
		},

		watch: {
			scss: { //scss can be watched if you like
				options: {
					livereload: true
				},
				files: ['source/css/**/*.scss', 'public/styleguide/css/*.scss'],
				tasks: ['devStyles'],
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
				tasks: ['devStyles'],
			},
		},
	};

	grunt.config.merge(config);

	grunt.registerTask('devStyles', ['webfont', 'sass:development', 'postcss', 'copy:style']);
	grunt.registerTask('prodStyles', ['webfont', 'sass:production', 'postcss', 'copy:style']);
};