import DopApp from 'DopApp';
import controller from 'controllers/menuBarController';
import 'animations/menuBarAnimation';

DopApp.directive("menuBar", () => ({
	scope: {},
	templateUrl: "menuBar.html",
	controllerAs: "viewModel",
	controller,
	bindToController: true
}));