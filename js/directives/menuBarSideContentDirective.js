import DopApp from 'DopApp';
import {directiveName as parentDirectiveName} from 'directives/menuBarDirective';
import {sideContentUnitType} from 'controllers/menuBarController';
import ngServices from 'utils/ngServices';
import {hidden as hiddenClass} from 'constants/classNames';
import 'animations/menuBarSideContentAnimation';



export const directiveName = "menuBarSideContent";

export const menuBarSideContentDirective = () => ({
	restrict: "A",
	require: `^${parentDirectiveName}`,
	link: ($scope, $element,  $attrs, parentDirective) => {
		const {isFullyOpened} = parentDirective.openClose;
		const unitName = $attrs.unitName;

		const openElement = $openedElement => ngServices.$animate.removeClass($openedElement, hiddenClass);
		const closeElement = $closedElement => ngServices.$animate.addClass($closedElement, hiddenClass);

		const open = ($openedElement) => {
			return openElement($openedElement);
		};

		const close = ($closedElement) => {
			return closeElement($closedElement);
		};

		const isThisUnitFullyOpened = () => isFullyOpened(unitName, sideContentUnitType);

		$scope.$watch(isThisUnitFullyOpened, fullyOpened => {
			if (fullyOpened) {
				open($element);
			} else {
				close($element);
			}
		});
	},
});

DopApp.directive(directiveName, menuBarSideContentDirective);