"format es6";

// Prevent Internet Explorer from chrashing on console.log statements
if (typeof console === "undefined") {
	window.console = {};
}

if (!console.log) {
	console.log = () => {};
}