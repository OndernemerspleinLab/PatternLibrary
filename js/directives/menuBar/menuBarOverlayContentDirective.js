import DopApp from 'DopApp';
import {directiveName as parentDirectiveName} from 'directives/menuBarDirective';

export const directiveName = "menuBarOverlayContent";

DopApp.directive(directiveName, () => ({
	require: `^${parentDirectiveName}`,
	link: ($scope, $element, $attrs, menuBarDirective) => {
		menuBarDirective.register({
			unitName: $attrs.unitName,
			unitType: "overlay",
			role: "content",
			element: $element[0],
		});
	},
}));