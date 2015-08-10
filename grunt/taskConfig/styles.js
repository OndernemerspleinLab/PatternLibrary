var path = require("path");

module.exports = function(grunt, devOrProd) {
	var config = {
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
		copy: {
			style: {
				files: [
					{ expand: true, cwd: './source/css/', src: ['*.css', '*.css.map'], dest: './public/css/' },
				]
			},
		},

		watch: {
			scss: { //scss can be watched if you like
				options: {
					livereload: true
				},
				files: ['source/css/**/*.scss', 'public/styleguide/css/*.scss'],
				tasks: ['styles'],
			},
		},
	};

	var stylesTasks;

	if (devOrProd === "dev") {
		stylesTasks = "devStyles";
	} else if (devOrProd === "prod") {
		stylesTasks = "prodStyles";
	} else {
		grunt.fail.fatal('devOrProd variable not properly set.');
	}

	grunt.config.merge(config);

	grunt.registerTask('copyStyles', ['copy:iconFont', 'copy:style']);

	grunt.registerTask('devStyles', ['webfont', 'sass:development', 'postcss', 'copyStyles']);
	grunt.registerTask('prodStyles', ['webfont', 'sass:production', 'postcss', 'copyStyles']);
	grunt.registerTask('styles', [stylesTasks]);
};