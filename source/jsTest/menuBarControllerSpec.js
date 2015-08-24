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
	let $window;
	let menuBar;
	let openedElement;

	beforeEach(inject((_$controller_, _$rootScope_) => {
		$controller = _$controller_;
		$rootScope = _$rootScope_;
		$animate = jasmine.createSpyObj('$animate', ['cancel', 'animate', 'addClass', 'removeClass']);
		element = angular.element(document.createElement("div"));
		$scope = $rootScope.$new(true);
		$window = document.createElement("div");
		menuBar = new MenuBarController(element, $scope, $animate, $window, 0);
		openedElement = document.createElement("div");
		openedElement.id = "openedElement";
		document.body.appendChild(openedElement);
	}));

	afterEach(() => {
		document.body.removeChild(openedElement);
	});

	it("should animate the menuBar when menuBar items are opened or closed", () => {

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

	it("should resize an opened menu when the window is resized", () => {
		$scope.$digest();

		menuBar.openClose.open("openedElement");
		$scope.$digest();

		expect($animate.addClass).toHaveBeenCalledWith(element, classNames.opened, {
			openedElement: openedElement
		});


		angular.element($window).triggerHandler("resize");
		$scope.$digest();

		expect($animate.animate).toHaveBeenCalledWith(element, null, { resize: true }, null, {
			openedElement: openedElement,
			duration: 100,
		});

	});
});