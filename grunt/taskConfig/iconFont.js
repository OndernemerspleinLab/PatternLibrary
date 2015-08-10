var path = require("path");

module.exports = function(grunt) {
	var config = {
		webfont: {
			options: {
				hashes: false,
				fontFilename: "icons-{hash}",
				relativeFontPath: "../fonts/iconFont/",
				engine: "node",
				stylesheet: "scss",
				template: "source/iconFontSource/template.css",
				htmlDemo: true,
				htmlDemoTemplate: "source/iconFontSource/demoTemplate.html",
				types: ["eot", "woff", "ttf", "svg"],
				rename: function (name) {
					var parsedPath = path.parse(name);
					parsedPath.ext = "";
					parsedPath.base = parsedPath.name;
					name = path.format(parsedPath);
					name = name.replace("\\", "/");
					name = name.replace(/^\/?source\/iconFontSource\//, "");
					name = name.replace(/[^\/A-z\-_0-9]/g, "-");
					return name;
				},
				templateOptions: {
					"objectName": "$iconKeyCodes",
					"functionName": "getIcon",
					"baseClass": "icon",
					"classPrefix": "icon-",
					"mixinPrefix": "icon-",
				},
				destHtml: 'source/iconFontSource/',
			},
			build: {
				src: ['source/iconFontSource/**/*.svg'],
				dest: 'source/fonts/iconFont/',
				destCss: 'source/css/scss/iconFont/',
			}
		},
		copy: {
			iconFont: {
				files: [
					{ expand: true, cwd: './source/fonts/', src: '**', dest: './public/fonts/'},
				]
			},
		},

		watch: {
			iconFont: {
				options: {
					livereload: true
				},
				files: [
					'source/iconFontSource/**/*.svg',
					'source/iconFontSource/template.css',
					'source/iconFontSource/demoTemplate.html',
				],
				tasks: ['devStyles'],
			},
		},
	};

	grunt.config.merge(config);
};