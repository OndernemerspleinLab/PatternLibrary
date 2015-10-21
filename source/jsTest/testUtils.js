import Modernizr from 'modernizr';
import DopApp from 'DopApp';

let csstransforms = Modernizr.csstransforms;
export const enableAnimations = () => Modernizr.csstransforms = true;
export const disableAnimations = () => Modernizr.csstransforms = false;
export const resetAnimations = () => Modernizr.csstransforms = csstransforms;
export const baseTestDirective = (directive, directiveName, expectedConfig) => {
	const config = directive();
	it("should have controllerAs and bindToController configured", () => {
		expect(config.controllerAs).toBe("viewModel");
		expect(config.bindToController).toBe(true);
	});

	Object.keys(expectedConfig).forEach((key) => {
		it(`should have ${key} properly configured`, () => {
			expect(expectedConfig[key]).toEqual(config[key]);
		});
	});

	it("should be available as a directive in DopApp", () => {
		expect(DopApp._invokeQueue.some(item => item[2][0] === directiveName));
	});
};

export const el = (type) => document.createElement(type);