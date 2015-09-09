import DopApp from 'DopApp';
import controller from 'controllers/mainMenuController';
import 'animations/menuBarAnimation';
import 'animations/menuBarContentAnimation';

export const menuBarDirective = () => ({
	scope: true,
	controllerAs: "viewModel",
	controller,
	restrict: "A",
	bindToController: true,
});

DopApp.directive("mainMenu", menuBarDirective);