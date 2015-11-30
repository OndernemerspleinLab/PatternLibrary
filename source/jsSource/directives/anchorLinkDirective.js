import DopApp from 'DopApp';
import ngServices from 'utils/ngServices';
import 'animations/scrollDocumentAnimation';

export const directiveName = "anchorLink";

DopApp.directive(directiveName, () => ({
	link: ($scope, $element) => {

		$element.on("click", (evnt) => {
			ngServices.$timeout(() => {
				const doc = ngServices.$document[0];
				const href = $element.attr("href");
				const id = href.replace(/^#/, "");
				const $target = doc.getElementById(id);
				ngServices.$animate.animate(doc.documentElement, null, {$element: $target});
			});
			evnt.preventDefault();
		});
	}
}));