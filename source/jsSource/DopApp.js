import angular from 'angular';
import ngAnimate from 'angular-animate';

window.getScope = (el) => angular.element(el).scope();

const app = angular.module("DopApp", [ngAnimate]);
app.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('{|');
	$interpolateProvider.endSymbol('|}');
});

export default app;