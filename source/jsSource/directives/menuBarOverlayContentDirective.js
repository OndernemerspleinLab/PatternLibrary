import DopApp from 'DopApp';
import {directiveName as parentDirectiveName} from 'directives/menuBarDirective';
import ngServices from 'utils/ngServices';
import {hidden as hiddenClass} from 'constants/classNames';



export const directiveName = "menuBarOverlayContent";

export const menuBarOverlayContentDirective = () => ({
	restrict: "A",
	require: `^${parentDirectiveName}`,
	link: ($scope, $element,  $attrs, parentDirective) => {
		const {isFullyOpened, visuallyOpen, visuallyClose} = parentDirective.viewModel.openClose;
		const unitName = ngServices.$parse($attrs.unitName)($scope);

		const openElement = $openedElement => ngServices.$animate.removeClass($openedElement, hiddenClass);
		const closeElement = $closedElement => ngServices.$animate.addClass($closedElement, hiddenClass);

		const open = ($openedElement, openedUnitType) => {
			visuallyOpen(openedUnitType);
			return openElement($openedElement);
		};

		const close = ($closedElement, closedUnitType) => {
			return closeElement($closedElement).then(() => {
				visuallyClose(closedUnitType);
			});
		};

		const isThisUnitFullyOpened = () => isFullyOpened(unitName);

		$scope.watch(isThisUnitFullyOpened, fullyOpened => {
			if (fullyOpened) {
				open($element, unitName);
			} else {
				close($element, unitName);
			}
		});
	},
});

DopApp.directive(directiveName, menuBarOverlayContentDirective);