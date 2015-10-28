import {registerScrollListener} from 'utils/scrollEvent';
import {registerResizeListener} from 'utils/resizeEvent';
import {registerClickAwayListener} from 'utils/clickAwayEvent';
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

	return Boolean(element) && element.classList.contains(className);
};

const isUnitSideContent = unit => {
	const element = getUnitElement(unit);
	return isElementSideContent(element);
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

	constructor($element, $scope, $animate, $window, $rootScope, $timeout) {
		let animationPromise;

		const resizeCallback = () => {
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
		};

		const scrollCallback = ({top}) => {
			this.menuBarRetracted = top > 0;
		};

		let removeClickAwayListener = () => {};

		const open = (openedUnit, oldOpenedUnit) => {
			const openedElement = getMenuBarSideContentElement(openedUnit);
			const closedElement = getMenuBarSideContentElement(oldOpenedUnit);
			$rootScope.menuOpened = Boolean(openedElement);
			this.openClose.visuallyOpen(sideContentUnitType);

			removeClickAwayListener();
			removeClickAwayListener = registerClickAwayListener(() => {
				this.openClose.close(openedUnit);
			}, $element[0]);

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
			removeClickAwayListener();
			removeClickAwayListener = () => {};
			animationPromise = $animate.removeClass($element, classNames.opened, {
				closedElement
			});

			if (animationPromise) {
				animationPromise.then(() => this.openClose.visuallyClose(sideContentUnitType));
			}
		};

		const openOrClose = (openedUnit, oldOpenedUnit) => {
			cancelAnimation(animationPromise);

			if (isUnitSideContent(openedUnit) && this.openClose.canBeVisuallyOpened(sideContentUnitType)) {
				open(openedUnit, oldOpenedUnit);
			} else {
				close(oldOpenedUnit);
			}
		};

		const init = () => {
			this.openClose = createOpenClose();
			this.sideContentUnitType = sideContentUnitType;
			registerResizeListener(resizeCallback);
			registerScrollListener(scrollCallback);
			$scope.$watch(this.openClose.getOpenedUnit, openOrClose);
			$scope.$watch(this.openClose.getVisuallyOpenedUnit, () => openOrClose(this.openClose.getOpenedUnit()));
		};

		init();

	}

	isMenuBarRetracted() {
		return this.menuBarRetracted && !this.openClose.isAnyOpened();
	}
}