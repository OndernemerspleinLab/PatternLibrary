import {registerScrollListener} from 'utils/scrollEvent';
import DopApp from 'DopApp';
import ngServices from 'utils/ngServices';
import {offScreen as offScreenClassName} from 'constants/classNames';
import 'animations/scrollDocumentAnimation';

export const directiveName = "backToTop";

DopApp.directive(directiveName, () => ({
	link: ($scope, $element) => {
		registerScrollListener(({top}) => {
			if (top > window.innerHeight) {
				ngServices.$animate.removeClass($element, offScreenClassName);
			} else {
				ngServices.$animate.addClass($element, offScreenClassName);
			}
		});

		$element.on("click", (evnt) => {
			ngServices.$timeout(
				() => ngServices.$animate.animate(ngServices.$document[0].documentElement, null, {scrollTop: 0})
			);
			evnt.preventDefault();
		});
	}
}));