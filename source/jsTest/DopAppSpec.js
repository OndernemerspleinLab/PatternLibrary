import angular from 'angular';
import DopApp from 'DopApp';

describe("DopApp", function () {
	it("should be a defined module", function () {
		expect(angular.module("DopApp")).toEqual(jasmine.any(Object));
	});

	it("should require ngAnimate", function () {
		expect(DopApp.requires).toEqual(["ngAnimate"]);
	});
});

