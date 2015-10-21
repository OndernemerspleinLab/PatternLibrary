import DopApp from 'DopApp';
import ngServices from 'utils/ngServices';
import {directiveName as parentDirectiveName} from 'directives/elementRegistarDirective';

export const directiveName = "registerElement";

export const registerElementDirective = () => ({
	require: `?^${parentDirectiveName}`,
	link: ($scope, $element, $attrs, parentController) => {
		const data = ngServices.$parse($attrs[directiveName])($scope);
		const element = $element[0];

		parentController.register(element, data);
	},
});

DopApp.directive(directiveName, registerElementDirective);