import DopApp from 'DopApp';
import {directiveName as parentDirectiveName} from 'directives/menuBarDirective';
import ngServices from 'utils/ngServices';
import {hidden as hiddenClass} from 'constants/classNames';
import 'animations/menuBarOverlayContentAnimation';

export const directiveName = "menuBarOverlayContent";

export const menuBarOverlayContentDirective = () => ({
	restrict: "A",
	require: `^${parentDirectiveName}`,
	link: ($scope, $element,  $attrs, parentDirective) => {
		const {isFullyOpened, visuallyOpen, visuallyClose} = parentDirective.openClose;
		const unitName = $attrs.unitName;

		const openElement = ($openedElement, buttonElement) => ngServices.$animate.removeClass($openedElement, hiddenClass, {buttonElement});
		const closeElement = ($closedElement) => ngServices.$animate.addClass($closedElement, hiddenClass);

		const findButton = (unitName) => {
			const {elementStore} = parentDirective.elementRegistar;
			const registration = elementStore.find(({data: {type, unitName: name}}) => type === 'button' && name === unitName);

			if (registration) {
				return registration.element;
			}
		};

		const open = ($openedElement, openedUnitType) => {
			visuallyOpen(openedUnitType);
			const buttonElement = findButton(unitName);
			return openElement($openedElement, buttonElement);
		};

		const close = ($closedElement, closedUnitType) => {
			return closeElement($closedElement).then(() => {
				visuallyClose(closedUnitType);
			});
		};

		const isThisUnitFullyOpened = () => isFullyOpened(unitName);

		$scope.$watch(isThisUnitFullyOpened, fullyOpened => {
			if (fullyOpened) {
				open($element, unitName);
			} else {
				close($element, unitName);
			}
		});
	},
});

DopApp.directive(directiveName, menuBarOverlayContentDirective);