import createOpenClose from 'openClose/singleOpened';

const getElement = (id) => {
	const element = document.getElementById(id);

	return element;
};

export default class menuBar {
	static get $inject() { return ['$element', '$scope', '$animate']; }

	constructor($element, $scope, $animate) {
		this.openClose = createOpenClose();

		$scope.$watch(this.openClose.getOpenedUnit, (openedUnit, oldOpenedUnit) => {
			if (openedUnit) {
				let openedElement = getElement(openedUnit);
				if (oldOpenedUnit) {
					$animate.animate($element, null, { resize: 0 }, null, {
						openedElement
					});
				} else {
					$animate.addClass($element, "is-opened", {
						openedElement
					});
				}
			} else {
				let closedElement = getElement(oldOpenedUnit);
				console.log(closedElement);
				$animate.removeClass($element, "is-opened", {
					closedElement
				});
			}
		});
	}
}