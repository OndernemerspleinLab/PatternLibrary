import DopApp from 'DopApp';
import controller from 'controllers/mainMenuController';
import 'animations/menuBarAnimation';
import {directiveName as parentDirectiveName} from 'directives/menuBarDirective';
import 'directives/menuBarSideContentDirective';
import 'directives/menuBarOverlayContentDirective';

export const directiveName = "mainMenu";
const controllerAs = 'viewModel';

export const mainMenuDirective = () => ({
	scope: true,
	controller,
	restrict: "A",
	bindToController: true,
	controllerAs,
	require: `?^${parentDirectiveName}`, // TODO parent directive checken als deze open gaat
	link: function ($scope, $element, $attrs, parentDirective) {
		if (parentDirective) {
			const {openClose: {isFullyOpened}, sideContentUnitType} = parentDirective;

			$scope[controllerAs].isFullyOpened = isFullyOpened;
			$scope[controllerAs].menuType = sideContentUnitType;
		}
	},
});

DopApp.directive(directiveName, mainMenuDirective);