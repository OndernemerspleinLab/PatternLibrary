import angular from 'angular';
import {debounce} from 'utils/functional';
import createOpenClose from 'openClose/singleOpened';
import * as classNames from 'constants/classNames';

const getElement = (id) => {
	if (!id) {
		return null;
	}

	const element = document.getElementById(id);

	return element;
};

export default class MenuBarController {
	static get $inject() { return ['$element', '$scope', '$animate', '$window']; }

	constructor($element, $scope, $animate, $window, debounceDuration = 100) {
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

		$scope.$watch(this.openClose.getOpenedUnit, (openedUnit, oldOpenedUnit) => {
			const closedElement = getElement(oldOpenedUnit);
			if (animationPromise) {
				$animate.cancel(animationPromise);
			}

			if (openedUnit) {
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
				animationPromise = $animate.removeClass($element, classNames.opened, {
					closedElement
				});
			}
		});
	}
}