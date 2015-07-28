import createOpenClose from 'openClose/singleOpened';

const getElement = (id) => {
	if (!id) {
		return null;
	}

	const element = document.getElementById(id);

	return element;
};

export default class menuBar {
	static get $inject() { return ['$element', '$scope', '$animate']; }

	constructor($element, $scope, $animate) {
		this.openClose = createOpenClose();
		let animationPromise;

		$scope.$watch(this.openClose.getOpenedUnit, (openedUnit, oldOpenedUnit) => {
			let closedElement = getElement(oldOpenedUnit);
			console.log(openedUnit, oldOpenedUnit);
			if (animationPromise) {
				$animate.cancel(animationPromise);
			}

			if (openedUnit) {
				let openedElement = getElement(openedUnit);
				if (oldOpenedUnit) {
					animationPromise = $animate.animate($element, null, { resize: true }, null, {
						openedElement,
						closedElement,
						duration: 100
					});
				} else {
					animationPromise = $animate.addClass($element, "is-opened", {
						openedElement
					});
				}
			} else {
				animationPromise = $animate.removeClass($element, "is-opened", {
					closedElement
				});
			}
		});
	}
}