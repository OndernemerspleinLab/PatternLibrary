import DopApp from 'DopApp';
import controller from 'controllers/menuBarController';

DopApp.directive("menuBar", () => ({
	controllerAs: "vm",
	controller
}));