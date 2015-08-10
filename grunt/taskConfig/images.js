module.exports = function(grunt) {
	var config = {
		copy: {
			images: {
				files: [
					{ expand: true, cwd: './source/images/', src: ['**/*.png', '**/*.jpg', '**/*.gif', '**/*.jpeg', '**/*.svg'], dest: './public/images/' },
				]
			},
		},
		watch: {
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

			},
		},
	};

	grunt.config.merge(config);
};