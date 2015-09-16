import DopApp from 'DopApp';
import controller from 'controllers/menuBarController';

export const directiveName = "menuBar";

export const menuBarDirective = () => ({
	scope: true,
	controllerAs: "viewModel",
	controller,
	restrict: "A",
	bindToController: true,
});

DopApp.directive(directiveName, menuBarDirective);