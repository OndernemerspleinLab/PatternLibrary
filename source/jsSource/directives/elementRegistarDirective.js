import DopApp from 'DopApp';
import {directiveName as parentDirectiveName} from 'directives/elementRegistarDirective';

export const directiveName = "elementRegistar";

class controller {
	constructor() {
		this.elementStore = [];
		this.register = (element, data) => {
			this.elementStore.push({
				element,
				data
			});
		};
	}
}

export const registerElementDirective = () => ({
	require: `?^${parentDirectiveName}`,
	controller
});

DopApp.directive(directiveName, registerElementDirective);