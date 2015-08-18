import DopApp from 'DopApp';
import controller from 'controllers/menuBarController';
import 'animations/menuBarAnimation';
import 'animations/menuBarContentAnimation';

export const menuBarDirective = () => ({
	scope: {},
	templateUrl: "menuBar.html",
	controllerAs: "viewModel",
	controller,
	bindToController: true
});

DopApp.directive("menuBar", menuBarDirective);