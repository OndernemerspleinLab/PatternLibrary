module.exports = function(grunt) {
	var config = {
		connect: {
			app: {
				options: {
					port: 9001,
					base: './public',
					hostname: 'localhost',
					open: true,
					livereload: 35729,
				},
			},
		},
		watch: {
			options: {},
		},
	};

	grunt.registerTask('serve', ['default', 'connect', 'karma:background', 'watch']);

	grunt.config.merge(config);
};