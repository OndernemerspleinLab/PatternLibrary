module.exports = function(grunt) {
	var config = {
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

		watch: {
			svgFigures: { //scss can be watched if you like
				options: {
					livereload: true
				},
				files: ['source/svgSource/**/*.svg'],
				tasks: ['buildSvg'],
			},
		},
	};

	grunt.config.merge(config);

	grunt.registerTask('svgFigures', ['svgstore', 'rename:svgFigures']);
	grunt.registerTask('buildSvg', ['svgFigures', 'buildTemplates']);
};