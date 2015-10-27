import {resetAnimations, enableAnimations, disableAnimations} from 'jsTest/testUtils';
import initAnimation, { getWidth } from 'animations/menuBarAnimation';
import Velocity from 'velocity-animate';
import angular from 'angular';
import prepNgServices from 'jsTest/prepNgServices';
import {opened} from 'constants/classNames';
import {menuBar as animationTiming} from 'constants/animationTiming';
import DopApp from 'DopApp';

describe("menuBarAnimation", () => {
	let openedElement;
	let mockElement;

	prepNgServices();

	beforeEach(() => {
		spyOn(DopApp, "animation");
		Velocity.calls.reset();
		Velocity.hook.calls.reset();
	});

	beforeEach(() => {
		openedElement = document.createElement('div');
		openedElement.style.minWidth = "200px";
		openedElement.style.maxWidth = "200px";
		const mockDomElement = document.createElement('div');
		mockElement = angular.element(mockDomElement);
		mockElement.css({
			position: "fixed",
			left: 0,
		});
		document.body.appendChild(mockDomElement);
		document.body.appendChild(openedElement);
	});

	afterEach(resetAnimations);
	afterEach(() => {
		document.body.removeChild(mockElement[0]);
		document.body.removeChild(openedElement);
	});

	it("should animate to 0px when there is no openedElement", () => {
		enableAnimations();
		initAnimation();
		const call = DopApp.animation.calls.mostRecent();
		const args = call.args;
		const configObj = args[1]();
		const mockOptions = {};
		const mockDone = () => {};

		configObj.removeClass(mockElement, opened, mockDone, mockOptions);

		expect(Velocity).toHaveBeenCalledWith(mockElement, "stop");
		expect(Velocity).toHaveBeenCalledWith(mockElement, {
			translateX: "0px",
		}, Object.assign({
			complete: jasmine.any(Function)
		}, animationTiming));

	});

	it("should animate to the width of an openedElement", () => {
		enableAnimations();
		initAnimation();
		const call = DopApp.animation.calls.mostRecent();
		const args = call.args;
		const configObj = args[1]();

		const mockOptions = {
			openedElement
		};
		const mockDone = () => {};
		const width = getWidth(openedElement);

		configObj.addClass(mockElement, opened, mockDone, mockOptions);

		expect(width).not.toBe("0px");

		expect(Velocity).toHaveBeenCalledWith(mockElement, "stop");
		expect(Velocity).toHaveBeenCalledWith(mockElement, {
			translateX: "200px",
		}, Object.assign({
			complete: mockDone
		}, animationTiming));
	});

	it("should transition instantly to 0px when animations are disabled", () => {
		disableAnimations();
		initAnimation();
		const call = DopApp.animation.calls.mostRecent();
		const args = call.args;
		const configObj = args[1]();
		const mockElement = [];
		const mockOptions = {};
		const mockDone = jasmine.createSpy();

		configObj.removeClass(mockElement, opened, mockDone, mockOptions);

		expect(Velocity.hook).toHaveBeenCalledWith(mockElement, "left", "0px");
		expect(mockDone).toHaveBeenCalled();
	});

	it("should transition instantly to the width of an openedElement when animations are disabled", () => {
		disableAnimations();
		initAnimation();
		const call = DopApp.animation.calls.mostRecent();
		const args = call.args;
		const configObj = args[1]();
		const mockElement = [];

		const mockOptions = {
			openedElement
		};
		const mockDone = jasmine.createSpy();
		const width = getWidth(openedElement);

		configObj.addClass(mockElement, opened, mockDone, mockOptions);

		expect(width).not.toBe("0px");
		expect(Velocity.hook).toHaveBeenCalledWith(mockElement, "left", width);
		expect(mockDone).toHaveBeenCalled();
	});


});