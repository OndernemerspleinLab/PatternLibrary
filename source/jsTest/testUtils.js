import Modernizr from 'modernizr';
import DopApp from 'DopApp';

let csstransforms = Modernizr.csstransforms;
export const enableAnimations = () => Modernizr.csstransforms = true;
export const disableAnimations = () => Modernizr.csstransforms = false;
export const resetAnimations = () => Modernizr.csstransforms = csstransforms;
export const baseTestDirective = ({directive, directiveName, templateUrl, controller, scopeConfig}) => {
	const config = directive();
	expect(config.controllerAs).toBe("viewModel");
	expect(config.bindToController).toBe(true);

	if (controller) {
		expect(config.controller).toBe(controller);
	}
	if (templateUrl) {
		expect(config.templateUrl).toBe(templateUrl);
	}
	if (scopeConfig) {
		expect(config.scope).toEqual(scopeConfig);
	}
	if (directiveName) {
		expect(DopApp._invokeQueue.some(item => item[2][0] === directiveName));
	}
};