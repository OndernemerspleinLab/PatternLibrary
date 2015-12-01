module.exports = function(grunt) {
	var port = 9001;
	var hostname = "localhost";
	var target = ['http://', hostname, ':', port, '/?p=atoms-code-guidelines'].join("");

	var config = {
		connect: {
			app: {
				options: {
					port: port,
					base: './public',
					hostname: hostname,
					open: target,
					livereload: 35729,
				},
			},
		},
		watch: {
			options: {},
		},
	};

	grunt.registerTask('instaServe', ['connect', 'watch']);
	grunt.registerTask('serve', ['default', 'instaServe']);

	grunt.config.merge(config);
};