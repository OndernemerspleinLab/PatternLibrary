import DopApp from 'DopApp';
import ngServices from 'utils/ngServices';
import 'animations/scrollDocumentAnimation';

export const directiveName = "backToTop";

DopApp.directive(directiveName, () => ({
	link: ($scope, $element) => {
		$element.on("click", (evnt) => {
			ngServices.$timeout(
				() => ngServices.$animate.animate(ngServices.$document[0].documentElement, null, {scrollTop: 0})
			);
			evnt.preventDefault();
		});
	}
}));