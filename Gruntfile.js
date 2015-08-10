module.exports = function(grunt) {
	// Config for building dev or prod
	var devOrProd = "dev";

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	});

	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// load the patternlab task
	grunt.task.loadTasks('./builder/');

	// load self defined tasks
	grunt.task.loadTasks('./grunt/tasks/');

	// load configuration for tasks
	require('./grunt/taskConfig/')(grunt, devOrProd);



	// ***** Most important tasks *****

	// ** Build patternlab **
	// grunt

	// ** Build patternlab and serve on http://localhost:9001 **
	// grunt serve

	// ** Build patternlab and deploy to GitHub Pages **
	// grunt deploy
};