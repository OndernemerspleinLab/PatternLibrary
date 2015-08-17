import {
	canAnimate, switchCallback,
	checkClass, checkClassDecorator,
	makeNgAnimationCallback,
} from 'utils/animationUtils';

import {resetAnimations, enableAnimations, disableAnimations} from 'jsTest/testUtils';

describe("animationUtils", () => {
	describe("switchCallback", () => {
		it("should switch between", () => {
			const truthyCallback = () => {};
			const falsyCallback = () => {};

			const callbackWithTrue = switchCallback(() => true, truthyCallback, falsyCallback);

			const callbackWithFalse = switchCallback(() => false, truthyCallback, falsyCallback);

			expect(callbackWithTrue).toBe(truthyCallback);
			expect(callbackWithFalse).toBe(falsyCallback);
		});
	});

	describe("canAnimate", () => {
		afterEach(resetAnimations);

		it("should return true when csstransforms are supported", () => {
			enableAnimations();
			expect(canAnimate()).toBe(true);
		});

		it("should return false when csstransforms are unsupported", () => {
			disableAnimations();
			expect(canAnimate()).toBe(false);
		});
	});

	describe("checkClass", () => {
		it("should check if className is part of classNameFilters", () => {
			expect(checkClass(["a", "b"], "a")).toBeTruthy();
			expect(checkClass(["a", "b"], "b")).toBeTruthy();
			expect(checkClass(["a", "b"], "c")).toBeFalsy();
		});

		it("should accept classNameFilters as a string", () => {
			expect(checkClass("a", "a")).toBeTruthy();
			expect(checkClass("a", "b")).toBeFalsy();

		});

		it("should return false when classNameFilters is omitted", () => {

			expect(checkClass(undefined, "a")).toBeFalsy();
			expect(checkClass(undefined, undefined)).toBeFalsy();
		});
	});

	describe("checkClassDecorator", () => {
		let spyCallback;
		beforeEach(function () {
			spyCallback = jasmine.createSpy("checkClassDecorator");
		});

		it("should return undefined when no callback is provided", () => {
			expect(checkClassDecorator("a", undefined)).toBeUndefined();
		});

		it("should execute the callback when the className matches", () => {
			const funcWithClassCheck = checkClassDecorator("a", spyCallback);
			const config = {
				className: "a",
				otherProp: "b"
			};
			funcWithClassCheck(config);
			expect(spyCallback).toHaveBeenCalledWith(config);
		});

		it("should not execute the callback when the className does not match", () => {
			const funcWithClassCheck = checkClassDecorator("a", spyCallback);
			const config = {
				className: "b",
				otherProp: "a"
			};
			funcWithClassCheck(config);
			expect(spyCallback.calls.count()).toBe(0);
		});
	});

	describe("makeNgAnimationCallback", () => {
		let spyCallback;
		beforeEach(function () {
			spyCallback = jasmine.createSpy("checkClassDecorator");
		});

		it("should build the correct arguments object for animate", () => {
			makeNgAnimationCallback(spyCallback, "animate")(1, 2, 3, 4, 5);

			expect(spyCallback).toHaveBeenCalledWith({
				'$element': 1,
				'from': 2,
				'to': 3,
				'done': 4,
				'options': 5
			});
		});

		it("should build the correct arguments object for beforeAnimate", () => {
			makeNgAnimationCallback(spyCallback, "beforeAnimate")(1, 2, 3, 4, 5);

			expect(spyCallback).toHaveBeenCalledWith({
				'$element': 1,
				'from': 2,
				'to': 3,
				'done': 4,
				'options': 5
			});
		});

		it("should build the correct arguments object for setClass", () => {
			makeNgAnimationCallback(spyCallback, "setClass")(1, 2, 3, 4, 5);

			expect(spyCallback).toHaveBeenCalledWith({
				'$element': 1,
				'classNameToAdd': 2,
				'classNameToRemove': 3,
				'done': 4,
				'options': 5
			});
		});

		it("should build the correct arguments object for beforeSetClass", () => {
			makeNgAnimationCallback(spyCallback, "beforeSetClass")(1, 2, 3, 4, 5);

			expect(spyCallback).toHaveBeenCalledWith({
				'$element': 1,
				'classNameToAdd': 2,
				'classNameToRemove': 3,
				'done': 4,
				'options': 5
			});
		});

		it("should build the correct arguments object for addClass", () => {
			makeNgAnimationCallback(spyCallback, "addClass")(1, 2, 3, 4);

			expect(spyCallback).toHaveBeenCalledWith({
				'$element': 1,
				'className': 2,
				'done': 3,
				'options': 4
			});
		});

		it("should build the correct arguments object for beforeAddClass", () => {
			makeNgAnimationCallback(spyCallback, "beforeAddClass")(1, 2, 3, 4);

			expect(spyCallback).toHaveBeenCalledWith({
				'$element': 1,
				'className': 2,
				'done': 3,
				'options': 4
			});
		});

		it("should build the correct arguments object for removeClass", () => {
			makeNgAnimationCallback(spyCallback, "removeClass")(1, 2, 3, 4);

			expect(spyCallback).toHaveBeenCalledWith({
				'$element': 1,
				'className': 2,
				'done': 3,
				'options': 4
			});
		});

		it("should build the correct arguments object for beforeRemoveClass", () => {
			makeNgAnimationCallback(spyCallback, "beforeRemoveClass")(1, 2, 3, 4);

			expect(spyCallback).toHaveBeenCalledWith({
				'$element': 1,
				'className': 2,
				'done': 3,
				'options': 4
			});
		});
	});
});