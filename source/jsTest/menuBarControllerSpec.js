import MenuBarController from 'controllers/menuBarController';
import mock from 'jsTest/ngMock';
import * as classNames from 'constants/classNames';
import angular from 'angular';

const {inject} = mock;

describe("menuBarController", () => {
	let $controller;
	let $scope;
	let $rootScope;
	let $animate;
	let element;
	let menuBar;

	beforeEach(inject((_$controller_, _$rootScope_) => {
		$controller = _$controller_;
		$rootScope = _$rootScope_;
		$animate = jasmine.createSpyObj('$animate', ['cancel', 'animate', 'addClass', 'removeClass']);
		element = angular.element(document.createElement("div"));
		$scope = $rootScope.$new(true);
		menuBar = new MenuBarController(element, $scope, $animate);
	}));

	it("animate the menuBar when menuBar items are opened or closed", () => {

		// Trigger before anything is opened or closed
		// just like normal usage
		$scope.$digest();

		menuBar.openClose.open("first");
		$scope.$digest();
		expect($animate.addClass).toHaveBeenCalledWith(element, classNames.opened, {
			openedElement: null
		});

		menuBar.openClose.open("second");
		$scope.$digest();
		expect($animate.animate).toHaveBeenCalledWith(element, null, { resize: true }, null, {
			openedElement: null,
			closedElement: null,
			duration: 100
		});

		menuBar.openClose.close("second");
		$scope.$digest();

		expect($animate.removeClass).toHaveBeenCalledWith(element, classNames.opened, {
			closedElement: null
		});
	});
});