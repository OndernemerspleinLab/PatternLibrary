module.exports = function(grunt) {
	// Config for building dev or prod,
	// can be overwritten by commandline argument
	var devOrProd = "dev";

	if (process.argv.indexOf("--dev") > -1) {
		devOrProd = "dev";
	}

	if (process.argv.indexOf("--prod") > -1 || process.argv.indexOf("deploy") > -1) {
		devOrProd = "prod";
	}

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

	// ** Build patternlab for production **
	// grunt --prod

	// ** Build patternlab and serve on http://localhost:9001 **
	// grunt serve

	// ** Build patternlab for production and deploy to GitHub Pages **
	// grunt deploy
};