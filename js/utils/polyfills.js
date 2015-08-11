if (typeof console === "undefined") {
	window.console = {};
}

if (!console.log) {
	console.log = function () {};
}