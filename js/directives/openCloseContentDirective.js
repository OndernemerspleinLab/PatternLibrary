import DopApp from 'DopApp';
import {partial, defaults} from 'utils/functional';
import {hidden as defaultHideClass} from 'constants/classNames';

// hideClass
// unitName
// openClose


export const openCloseContentDirective = ($animate, $parse) => ({
	scope: false,
	restrict: "A",
	link: ($scope, $element, $attrs) => {
		const {hideClass, unitName} = defaults($attrs, {hideClass: defaultHideClass});
		const openCloseGetter = $parse($attrs.openCloseContent);
		const {visuallyOpen, visuallyClose, isFullyOpened, isVisuallyOpened} = openCloseGetter($scope);

		if (!unitName) {
			return;
		}

		$scope.$watch(partial(isFullyOpened, unitName), function (opened) {
			if (opened) {
				visuallyOpen(unitName);
				$animate.removeClass($element, hideClass);
			} else {
				$animate.addClass($element, hideClass).then(() => {
					if (isVisuallyOpened(unitName)) {
						visuallyClose(unitName);
					}
				});
			}
		});
	},
});
openCloseContentDirective.$inject = ['$animate', '$parse'];

DopApp.directive("openCloseContent", openCloseContentDirective);