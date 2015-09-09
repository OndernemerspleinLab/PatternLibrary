import angular from 'angular';
import {debounce} from 'utils/functional';
import {registerScrollListener} from 'utils/scrollEvent';
import createOpenClose from 'openClose/singleOpened';
import ngServices from 'utils/ngServices';
import * as classNames from 'constants/classNames';

const getElement = (id) => {
	if (!id) {
		return null;
	}

	const element = document.getElementById(id);

	return element;
};

const cancelAnimation = (animationPromise) => {
	if (animationPromise) {
		ngServices.$animate.cancel(animationPromise);
	}
};

export default class MenuBarController {
	static get $inject() { return ['$element', '$scope', '$animate', '$window', '$rootScope']; }

	constructor($element, $scope, $animate, $window, $rootScope, debounceDuration = 100) {
		this.openClose = createOpenClose();
		let animationPromise;

		angular.element($window).on("resize", debounce(() => {
			if (animationPromise) {
				$animate.cancel(animationPromise);
			}

			const openedUnit = this.openClose.getOpenedUnit();

			if (openedUnit) {

				$scope.$apply(() => {
					const openedElement = getElement(openedUnit);

					animationPromise = $animate.animate($element, null, { resize: true }, null, {
						openedElement,
						duration: 100,
					});
				});
			}

		}, debounceDuration));

		registerScrollListener(({top}) => {
			this.menuBarRetracted = top > 0;
		});

		$scope.$watch(this.openClose.getOpenedUnit, (openedUnit, oldOpenedUnit) => {
			const closedElement = getElement(oldOpenedUnit);
			cancelAnimation(animationPromise);

			if (openedUnit) {
				$rootScope.menuOpened = true;
				const openedElement = getElement(openedUnit);
				if (oldOpenedUnit) {
					animationPromise = $animate.animate($element, null, { resize: true }, null, {
						openedElement,
						closedElement,
						duration: 100
					});
				} else {
					animationPromise = $animate.addClass($element, classNames.opened, {
						openedElement
					});
				}
			} else {
				$rootScope.menuOpened = false;
				animationPromise = $animate.removeClass($element, classNames.opened, {
					closedElement
				});
			}
		});
	}

	isMenuBarRetracted() {
		return this.menuBarRetracted && !this.openClose.isAnyOpened();
	}
}