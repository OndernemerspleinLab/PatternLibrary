import angular from 'angular';
import {
	debounce,
	// existing,
} from 'utils/functional';
import {registerScrollListener} from 'utils/scrollEvent';
import createOpenClose from 'openClose/singleOpened';
import ngServices from 'utils/ngServices';
import * as classNames from 'constants/classNames';
import {menuBarSideContent} from 'constants/animationSelectors';

export const sideContentUnitType = "sideContent";

const getUnitElement = (unit) => {
	if (!unit) {
		return null;
	}

	return document.getElementById(unit);
};

const isElementSideContent = element => {
	const className = menuBarSideContent.replace(/^\./, "");

	if (element && element.classList.contains(className)) {
		return element;
	}
};

const getMenuBarSideContentElement = (unit) => {
	const element = getUnitElement(unit);

	if (isElementSideContent(element)) {
		return element;
	}

	return null;
};

const cancelAnimation = (animationPromise) => {
	if (animationPromise) {
		ngServices.$animate.cancel(animationPromise);
	}
};

export default class MenuBarController {
	static get $inject() { return ['$element', '$scope', '$animate', '$window', '$rootScope', '$timeout']; }

	constructor($element, $scope, $animate, $window, $rootScope, $timeout, debounceDuration = 100) {
		this.openClose = createOpenClose();
		let animationPromise;

		angular.element($window).on("resize", debounce(() => {
			if (animationPromise) {
				$animate.cancel(animationPromise);
			}

			const openedUnit = this.openClose.getOpenedUnit();

			if (openedUnit) {

				$timeout(() => {
					const openedElement = getMenuBarSideContentElement(openedUnit);

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

		const open = (openedUnit, oldOpenedUnit) => {
			this.openClose.visuallyOpen(sideContentUnitType);
			const openedElement = getMenuBarSideContentElement(openedUnit);
			const closedElement = getMenuBarSideContentElement(oldOpenedUnit);
			$rootScope.menuOpened = Boolean(openedElement);

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
		};

		const close = (oldOpenedUnit) => {
			const closedElement = getMenuBarSideContentElement(oldOpenedUnit);
			$rootScope.menuOpened = false;
			animationPromise = $animate.removeClass($element, classNames.opened, {
				closedElement
			});

			if (animationPromise) {
				animationPromise.then(() => this.openClose.visuallyClose(sideContentUnitType));
			}
		};

		const openOrClose = (openedUnit, oldOpenedUnit) => {
			cancelAnimation(animationPromise);

			if (openedUnit) {
				open(openedUnit, oldOpenedUnit);
			} else {
				close(oldOpenedUnit);
			}
		};

		$scope.$watch(this.openClose.getOpenedUnit, openOrClose);
		$scope.$watch(this.openClose.getVisuallyOpenedUnit, () => openOrClose(this.openClose.getOpenedUnit()));
	}

	isMenuBarRetracted() {
		return this.menuBarRetracted && !this.openClose.isAnyOpened();
	}
}