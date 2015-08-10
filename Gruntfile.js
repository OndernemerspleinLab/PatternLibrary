module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	});

	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	//load the patternlab task
	grunt.task.loadTasks('./builder/');
	grunt.task.loadTasks('./grunt/tasks/');

	require('./grunt/taskConfig/styles')(grunt);
	require('./grunt/taskConfig/scripts')(grunt);
	require('./grunt/taskConfig/svg')(grunt);
	require('./grunt/taskConfig/images')(grunt);
	require('./grunt/taskConfig/main')(grunt);
	require('./grunt/taskConfig/serve')(grunt);
	require('./grunt/taskConfig/deploy')(grunt);



	// ***** Most important tasks Tasks *****

	// ** Build patternlab **
	// grunt

	// ** Build patternlab and serve on http://localhost:9001 **
	// grunt serve

	// ** Build patternlab and deploy to GitHub Pages **
	// grunt deploy
};