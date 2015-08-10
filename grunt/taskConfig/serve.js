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
	};

	grunt.registerTask('serve', ['default', 'connect', 'watch']);

	grunt.config.merge(config);
};