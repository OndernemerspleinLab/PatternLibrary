module.exports = function(grunt, devOrProd) {

	var devReplacements = [
		{
			from: '<!--dev:',
			to: '<!--dev-->',
		},
		{
			from: ':/dev-->',
			to: '<!--/dev-->',
		},
		{
			from: '<!--prod-->',
			to: '<!--prod:',
		},
		{
			from: '<!--/prod-->',
			to: ':/prod-->',
		},
	];

	var prodReplacements = [
		{
			from: '<!--prod:',
			to: '<!--prod-->',
		},
		{
			from: ':/prod-->',
			to: '<!--/prod-->',
		},
		{
			from: '<!--dev-->',
			to: '<!--dev:',
		},
		{
			from: '<!--/dev-->',
			to: ':/dev-->',
		},
	];

	var replaceTask;
	var replaceNormalizeTask = "replace:scriptTagsDev";

	if (devOrProd === "dev") {
		replaceTask = "replace:scriptTagsDev";
	} else if (devOrProd === "prod") {
		replaceTask = "replace:scriptTagsProd";
	} else {
		grunt.fail.fatal('devOrProd variable not properly set.');
	}

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
		replace: {
			scriptTagsDev: {
				replacements: devReplacements,
				overwrite: true,
				src: [
					'./source/_patternlab-files/styleguide.mustache',
					'./source/_patternlab-files/viewall.mustache',
					'./source/_patternlab-files/pattern-header-footer/footer.html',
				],
			},
			scriptTagsProd: {
				replacements: prodReplacements,
				overwrite: true,
				src: [
					'./source/_patternlab-files/styleguide.mustache',
					'./source/_patternlab-files/viewall.mustache',
					'./source/_patternlab-files/pattern-header-footer/footer.html',
				],
			},
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
				tasks: ['buildTemplates']
			},
		},
	};

	grunt.config.merge(config);

	grunt.registerTask('copyToPublic', ['copy:main', 'copy:images']);
	grunt.registerTask('buildTemplates', [replaceTask, 'patternlab', replaceNormalizeTask]);
	grunt.registerTask('default', ['clean', 'svgFigures', 'buildTemplates', 'styles', 'scripts', 'copyToPublic']);
};