import DopApp from 'DopApp';
import {directiveName as parentDirectiveName} from 'directives/menuBarDirective';

export const directiveName = "menuBarSideContent";

DopApp.directive(directiveName, () => ({
	require: `^${parentDirectiveName}`,
	link: ($scope, $element, $attrs, menuBarDirective) => {
		menuBarDirective.register({
			unitName: $attrs.unitName,
			unitType: "side",
			role: "content",
			element: $element[0],
		});
	},
}));