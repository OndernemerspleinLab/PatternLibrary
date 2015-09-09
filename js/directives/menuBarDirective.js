import DopApp from 'DopApp';
import controller from 'controllers/menuBarController';
import 'animations/heightAnimation';

export const menuBarDirective = () => ({
	scope: true,
	controllerAs: "viewModel",
	controller,
	restrict: "A",
	bindToController: true,
});

DopApp.directive("menuBar", menuBarDirective);