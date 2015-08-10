module.exports = function (grunt) {
	require('./iconFont')(grunt);
	require('./styles')(grunt);
	require('./scripts')(grunt);
	require('./svg')(grunt);
	require('./images')(grunt);
	require('./main')(grunt);
	require('./serve')(grunt);
	require('./deploy')(grunt);
};