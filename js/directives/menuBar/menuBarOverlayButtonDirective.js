import DopApp from 'DopApp';
import {directiveName as parentDirectiveName} from 'directives/menuBarDirective';

export const directiveName = "menuBarOverlayButton";

DopApp.directive(directiveName, () => ({
	require: `^${parentDirectiveName}`,
	link: ($scope, $element, $attrs, menuBarDirective) => {
		const unitElementData = {
			unitName: $attrs.unitName,
			unitType: "overlay",
			role: "button",
			action: $attrs.clickAction || "toggle",
			element: $element[0],
		};
		menuBarDirective.register(unitElementData);

		$element.on("click", () => {
			menuBarDirective.handleClick(unitElementData);
		});
	},
}));