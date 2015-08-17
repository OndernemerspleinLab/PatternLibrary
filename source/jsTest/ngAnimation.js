import angular from 'angular';
import Modernizr from 'modernizr';
import {animation} from 'utils/ngAnimation';

let csstransforms = Modernizr.csstransforms;
const enableAnimations = () => Modernizr.csstransforms = true;
const disableAnimations = () => Modernizr.csstransforms = false;
const resetAnimations = () => Modernizr.csstransforms = csstransforms;

describe("ngAnimation", () => {
	describe("animation", () => {
		let module;
		let selector;
		let animateSpies;
		let instantSpies;
		let callArgs;
		let configObj;

		const initAnimation = (classNameFilters = ["a", "b"]) => {
			animation(Object.assign({
				module,
				selector,

				classNameFilters,
			}, animateSpies, instantSpies));

			callArgs = module.animation.calls.mostRecent().args;

			configObj = callArgs[1]();

			configObj.addClass(1, "a", 3, 4);
			configObj.beforeAddClass(1, "a", 3, 4);
			configObj.removeClass(1, "a", 3, 4);
			configObj.beforeRemoveClass(1, "a", 3, 4);
			configObj.setClass(1, 2, 3, 4, 5);
			configObj.beforeSetClass(1, 2, 3, 4, 5);
			configObj.animate(1, 2, 3, 4, 5);
			configObj.beforeAnimate(1, 2, 3, 4, 5);
		};

		beforeEach(() => {

			module = angular.module("animationUtilsSpec", []);
			spyOn(module, "animation");

			selector = ".className";

			animateSpies = {
				beforeAnimate: jasmine.createSpy("beforeAnimate"),
				animate: jasmine.createSpy("animate"),

				setClass: jasmine.createSpy("setClass"),
				beforeSetClass: jasmine.createSpy("beforeSetClass"),

				addClass: jasmine.createSpy("addClass"),
				beforeAddClass: jasmine.createSpy("beforeAddClass"),

				removeClass: jasmine.createSpy("removeClass"),
				beforeRemoveClass: jasmine.createSpy("beforeRemoveClass"),
			};

			instantSpies = {
				beforeAnimateInstant: jasmine.createSpy("beforeAnimateInstant"),
				animateInstant: jasmine.createSpy("animateInstant"),

				setClassInstant: jasmine.createSpy("setClassInstant"),
				beforeSetClassInstant: jasmine.createSpy("beforeSetClassInstant"),

				addClassInstant: jasmine.createSpy("addClassInstant"),
				beforeAddClassInstant: jasmine.createSpy("beforeAddClassInstant"),

				removeClassInstant: jasmine.createSpy("removeClassInstant"),
				beforeRemoveClassInstant: jasmine.createSpy("beforeRemoveClassInstant"),
			};
		});

		afterEach(resetAnimations);

		it("should have called the module’s animation method", () => {
			initAnimation();
			expect(callArgs[0]).toBe(selector);
		});

		it("should have the animate callbacks set", () => {
			enableAnimations();
			initAnimation();

			expect(animateSpies.addClass).toHaveBeenCalledWith({
				$element: 1,
				className: "a",
				done: 3,
				options: 4,
			});
			expect(animateSpies.beforeAddClass).toHaveBeenCalledWith({
				$element: 1,
				className: "a",
				done: 3,
				options: 4,
			});
			expect(animateSpies.removeClass).toHaveBeenCalledWith({
				$element: 1,
				className: "a",
				done: 3,
				options: 4,
			});
			expect(animateSpies.beforeRemoveClass).toHaveBeenCalledWith({
				$element: 1,
				className: "a",
				done: 3,
				options: 4,
			});
			expect(animateSpies.setClass).toHaveBeenCalledWith({
				$element: 1,
				classNameToAdd: 2,
				classNameToRemove: 3,
				done: 4,
				options: 5,
			});
			expect(animateSpies.beforeSetClass).toHaveBeenCalledWith({
				$element: 1,
				classNameToAdd: 2,
				classNameToRemove: 3,
				done: 4,
				options: 5,
			});
			expect(animateSpies.animate).toHaveBeenCalledWith({
				'$element': 1,
				'from': 2,
				'to': 3,
				'done': 4,
				'options': 5
			});
			expect(animateSpies.beforeAnimate).toHaveBeenCalledWith({
				'$element': 1,
				'from': 2,
				'to': 3,
				'done': 4,
				'options': 5
			});
		});

		it("should have the instant callbacks set", () => {
			disableAnimations();
			initAnimation();

			expect(instantSpies.addClassInstant).toHaveBeenCalledWith({
				$element: 1,
				className: "a",
				done: 3,
				options: 4,
			});
			expect(instantSpies.beforeAddClassInstant).toHaveBeenCalledWith({
				$element: 1,
				className: "a",
				done: 3,
				options: 4,
			});
			expect(instantSpies.removeClassInstant).toHaveBeenCalledWith({
				$element: 1,
				className: "a",
				done: 3,
				options: 4,
			});
			expect(instantSpies.beforeRemoveClassInstant).toHaveBeenCalledWith({
				$element: 1,
				className: "a",
				done: 3,
				options: 4,
			});
			expect(instantSpies.setClassInstant).toHaveBeenCalledWith({
				$element: 1,
				classNameToAdd: 2,
				classNameToRemove: 3,
				done: 4,
				options: 5,
			});
			expect(instantSpies.beforeSetClassInstant).toHaveBeenCalledWith({
				$element: 1,
				classNameToAdd: 2,
				classNameToRemove: 3,
				done: 4,
				options: 5,
			});
			expect(instantSpies.animateInstant).toHaveBeenCalledWith({
				'$element': 1,
				'from': 2,
				'to': 3,
				'done': 4,
				'options': 5
			});
			expect(instantSpies.beforeAnimateInstant).toHaveBeenCalledWith({
				'$element': 1,
				'from': 2,
				'to': 3,
				'done': 4,
				'options': 5
			});
		});

		it("should have the instant callbacks set", () => {
			disableAnimations();
			initAnimation(["c"]);

			expect(instantSpies.addClassInstant.calls.count()).toBe(0);
			expect(instantSpies.beforeAddClassInstant.calls.count()).toBe(0);
			expect(instantSpies.removeClassInstant.calls.count()).toBe(0);
			expect(instantSpies.beforeRemoveClassInstant.calls.count()).toBe(0);

			expect(animateSpies.addClass.calls.count()).toBe(0);
			expect(animateSpies.beforeAddClass.calls.count()).toBe(0);
			expect(animateSpies.removeClass.calls.count()).toBe(0);
			expect(animateSpies.beforeRemoveClass.calls.count()).toBe(0);
		});
	});
});