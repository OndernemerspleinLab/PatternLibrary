import DopApp from 'DopApp';
import ngServices from 'utils/ngServices';
import {hidden as hiddenClass} from 'constants/classNames';
import createOpenClose from 'openClose/singleOpened';


export const directiveName = "scBlock";

class ScBlock {
	get $inject () { return ['$scope', '$element', '$attrs']; }

	constructor () {
		const resultElementCallbacks = [];

		Object.assign(this, createOpenClose());

		this.register = (element) => resultElementCallbacks.push(element);

		this.resultCallback = (opened) => resultElementCallbacks.forEach((callback) => callback(opened));
	}
}


DopApp.directive(directiveName, () => ({
	restrict: "A",
	controllerAs: "viewModel",
	controller: ScBlock,
	scope: true,
	bindToController: true,
}));

const resultsDirectiveName = `${directiveName}Results`;
DopApp.directive(resultsDirectiveName, () => ({
	restrict: "A",
	require: `^${directiveName}`,
	link: ($scope, $element, $attrs, parentDirective) => {
		parentDirective.register((opened) => {
			if (opened) {
				ngServices.$animate.removeClass($element, hiddenClass);
			}
		});

		const getter = ngServices.$parse($attrs[resultsDirectiveName]);

		$scope.$watch(() => getter($scope), (opened) => {
			if (!opened) {
				ngServices.$animate.addClass($element, hiddenClass);
			}
		});
	},
}));