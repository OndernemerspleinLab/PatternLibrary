module.exports = function(grunt) {
	var config = {
		clean: {
			options: { force: true },
			files: ['./public/patterns', './fonts/iconFont']
		},
		copy: {
			main: {
				files: [
					{ expand: true, cwd: './source/_data/', src: 'annotations.js', dest: './public/data/' }
				]
			}
		},
		watch: {
			main: {
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
		},
	};

	grunt.config.merge(config);

	grunt.registerTask('copyToPublic', ['copy:main', 'copy:images']);
	grunt.registerTask('default', ['clean', 'svgFigures', 'patternlab', 'devStyles', 'devScripts', 'copyToPublic']);
	grunt.registerTask('bundle', ['default', 'prodStyles', 'prodScripts']);
};