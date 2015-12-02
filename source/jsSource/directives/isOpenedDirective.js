import DopApp from 'DopApp';
import ngServices from 'utils/ngServices';
import {opened as openedClass} from 'constants/classNames';

export const directiveName = "isOpened";

DopApp.directive(directiveName, () => ({
	restrict: "A",
	link: ($scope, $element, $attrs) => {
		const getter = ngServices.$parse($attrs[directiveName]);

		$scope.$watch(() => getter($scope), (opened) => {
			if (opened) {
				ngServices.$animate.addClass($element, openedClass);
			} else {
				ngServices.$animate.removeClass($element, openedClass);
			}
		});
	},
}));