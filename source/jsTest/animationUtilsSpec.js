import {
	switchCallback, checkClass, checkClassDecorator
} from 'utils/animationUtils';

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

		// Hier verder gaan
	});
});