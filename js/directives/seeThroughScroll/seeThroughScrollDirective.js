import DopApp from 'DopApp';
import controller from 'controllers/seeThroughScroll/seeThroughScrollController';
import 'animations/seeThroughScrollAnimation';
import {directiveName as parentDirectiveName} from 'directives/mainMenuDirective';

const controllerAs = 'seeThroughScroll';

export const seeThroughtScrollDirective = () => ({
	restrict: "A",
	scope: false,
	controller,
	controllerAs,
	require: `?^${parentDirectiveName}`, // TODO parent directive checken als deze open gaat
	link: function ($scope, $element, $attrs, parentDirective) {
		if (parentDirective) {
			$scope[controllerAs].isParentFullyOpened = parentDirective.isMenuFullyOpened;
		}
	},
});

export const directiveName = "seeThroughScroll";

DopApp.directive(directiveName, seeThroughtScrollDirective);