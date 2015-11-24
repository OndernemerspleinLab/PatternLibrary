import angular from 'angular';
import ngAnimate from 'angular-animate';

window.getScope = (el) => angular.element(el).scope();

const app = angular.module("DopApp", [ngAnimate]);

const setInterpolation = ($interpolateProvider) => {
	$interpolateProvider.startSymbol('{|');
	$interpolateProvider.endSymbol('|}');
};

setInterpolation.$inject = ['$interpolateProvider'];
app.config(setInterpolation);

export default app;