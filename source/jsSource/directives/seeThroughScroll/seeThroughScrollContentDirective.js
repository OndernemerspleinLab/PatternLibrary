import DopApp from 'DopApp';
import {directiveName as parentDirectiveName} from 'directives/seeThroughScroll/seeThroughScrollDirective';

const directiveName = "seeThroughScrollElement";

export const seeThroughScrollElementDirective = () => ({
	restrict: "A",
	scope: false,
	require: `^${parentDirectiveName}`,
	link: ($scope, $element, $attrs, parentController) => {
		const {unitName} = $attrs;
		const elementRole = $attrs[directiveName];

		parentController.register(elementRole, unitName, $element);
	},
});

DopApp.directive(directiveName, seeThroughScrollElementDirective);