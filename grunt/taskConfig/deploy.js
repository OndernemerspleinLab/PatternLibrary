module.exports = function(grunt) {
	var config = {
		buildcontrol: {
			'gh-pages': {
				options: {
					dir: 'public',
					commit: true,
					push: true,
		            message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%',
					remote: 'https://github.com/OndernemerspleinLab/PatternLibrary.git',
					branch: 'gh-pages',
				},
			},
		},
	};

	// Deploy to GitHub Pages
	grunt.registerTask('deploy', "Deploy to github pages", ['default', 'buildcontrol:gh-pages']);

	grunt.config.merge(config);
};