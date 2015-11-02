import DopApp from 'DopApp';
import controller from 'controllers/menuBarController';
import 'directives/registerElementDirective';
import 'directives/backToTopDirective';

export const directiveName = "menuBar";

const controllerAs = "viewModel";

export const menuBarDirective = () => ({
	scope: true,
	controllerAs,
	controller,
	restrict: "A",
	bindToController: true,
});

DopApp.directive(directiveName, menuBarDirective);