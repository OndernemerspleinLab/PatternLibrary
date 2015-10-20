import DopApp from 'DopApp';
import controller from 'controllers/menuBarController';
import {directiveName as elementRegistarDirectiveName} from 'directives/elementRegistarDirective';
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
	require: elementRegistarDirectiveName,
	link: ($scope, $element, $attrs, elementRegistarController) => {
		$scope[controllerAs].elementRegistar = elementRegistarController;
	}
});

DopApp.directive(directiveName, menuBarDirective);