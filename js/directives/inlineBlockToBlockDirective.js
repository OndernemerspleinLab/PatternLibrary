import DopApp from 'DopApp';
import ngServices from 'utils/ngServices';
import 'animations/inlineBlockToBlockAnimation';
import {opened as openedClass} from 'constants/classNames';

export const directiveName = "inlineBlockToBlock";

class InlineBlockToBlock {
	get $inject () { return ['$scope', '$element', '$attrs']; }

	constructor ($scope, $element, $attrs) {
		const blockOnlyElements = [];

		this.register = (element) => blockOnlyElements.push(element);

		const getter = ngServices.$parse($attrs[directiveName]);
		const animationCallback = ngServices.$parse($attrs.animationCallback)($scope);

		$scope.$watch(() => getter($scope), (opened) => {
			const promise = opened ?
					ngServices.$animate.addClass($element, openedClass, { blockOnlyElements }) :
					ngServices.$animate.removeClass($element, openedClass, { blockOnlyElements });
			promise.then(() => animationCallback && animationCallback(opened));
		});
	}
}

DopApp.directive(directiveName, () => ({
	restrict: "A",
	controller: InlineBlockToBlock,
}));


DopApp.directive(directiveName + "BlockOnly", () => ({
	restrict: "A",
	require: `^${directiveName}`,
	link: ($scope, $element, $attrs, parentController) => {
		parentController.register($element[0]);
	},
}));