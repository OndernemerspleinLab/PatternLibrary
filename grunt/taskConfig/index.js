module.exports = function (grunt, devOrProd) {
	require('./iconFont')(grunt, devOrProd);
	require('./styles')(grunt, devOrProd);
	require('./scripts')(grunt, devOrProd);
	require('./svg')(grunt, devOrProd);
	require('./images')(grunt, devOrProd);
	require('./main')(grunt, devOrProd);
	require('./serve')(grunt, devOrProd);
	require('./deploy')(grunt, devOrProd);
};