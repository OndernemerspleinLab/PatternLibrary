import {resetAnimations, enableAnimations, disableAnimations} from 'jsTest/testUtils';
import initAnimation from 'animations/menuBarContentAnimation';
import Velocity from 'velocity-animate';
import {hidden} from 'constants/classNames';
import {menuBarContent as animationTiming} from 'constants/animationTiming';
import DopApp from 'DopApp';

describe("menuBarAnimation", () => {

	beforeEach(() => {
		spyOn(DopApp, "animation");
		Velocity.calls.reset();
		Velocity.hook.calls.reset();
	});

	afterEach(resetAnimations);

	it("should prepare an element to be animated open", () => {
		enableAnimations();
		initAnimation();
		const call = DopApp.animation.calls.mostRecent();
		const args = call.args;
		const configObj = args[1]();
		const mockElement = [{ style: {opacity: ""}}];
		const mockOptions = {};
		const mockDone = jasmine.createSpy();

		configObj.beforeRemoveClass(mockElement, hidden, mockDone, mockOptions);

		expect(Velocity).toHaveBeenCalledWith(mockElement, "stop");
		expect(Velocity.hook).toHaveBeenCalledWith(mockElement, "z-index", 2);
		expect(Velocity.hook).toHaveBeenCalledWith(mockElement, "opacity", 0);
		expect(mockDone).toHaveBeenCalled();
	});

	it("should animate an element open", () => {
		enableAnimations();
		initAnimation();
		const call = DopApp.animation.calls.mostRecent();
		const args = call.args;
		const configObj = args[1]();
		const mockElement = [];
		const mockOptions = {};
		const mockDone = jasmine.createSpy();

		configObj.removeClass(mockElement, hidden, mockDone, mockOptions);

		expect(Velocity).toHaveBeenCalledWith(mockElement, {
			opacity: 1
		}, Object.assign({
			queue: false,
			complete: mockDone
		}, animationTiming));
	});

	it("should prepare an element to be animated close", () => {
		enableAnimations();
		initAnimation();
		const call = DopApp.animation.calls.mostRecent();
		const args = call.args;
		const configObj = args[1]();
		const mockElement = [{ style: {opacity: ""}}];
		const mockOptions = {};
		const mockDone = jasmine.createSpy();

		configObj.beforeAddClass(mockElement, hidden, mockDone, mockOptions);

		expect(Velocity).toHaveBeenCalledWith(mockElement, "stop");
		expect(Velocity.hook).toHaveBeenCalledWith(mockElement, "z-index", 1);
		expect(Velocity.hook).toHaveBeenCalledWith(mockElement, "opacity", 1);
		expect(mockDone).toHaveBeenCalled();
	});

	it("should animate an element close", () => {
		enableAnimations();
		initAnimation();
		const call = DopApp.animation.calls.mostRecent();
		const args = call.args;
		const configObj = args[1]();
		const mockElement = [];
		const mockOptions = {};
		const mockDone = jasmine.createSpy();

		configObj.addClass(mockElement, hidden, mockDone, mockOptions);

		expect(Velocity).toHaveBeenCalledWith(mockElement, {
			opacity: 0
		}, Object.assign({
			queue: false,
			complete: mockDone
		}, animationTiming));
	});

	it("should do nothing when animations are disabled", () => {
		disableAnimations();
		initAnimation();
		const call = DopApp.animation.calls.mostRecent();
		const args = call.args;
		const configObj = args[1]();

		expect(configObj.beforeAddClass).toBeUndefined();
		expect(configObj.addClass).toBeUndefined();
		expect(configObj.beforeRemoveClass).toBeUndefined();
		expect(configObj.removeClass).toBeUndefined();

		expect(Velocity.calls.count()).toBe(0);
		expect(Velocity.hook.calls.count()).toBe(0);
	});
});