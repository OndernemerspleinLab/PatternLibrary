import {hidden as defaultHiddenClass} from 'constants/classNames';
import {defaults, partial} from 'utils/functional';
import {registerResizeListener} from 'utils/resizeEvent';
import ngServices from 'utils/ngServices';

const openUnit = (openClose, hiddenClass, $wrapper, unitName, unitElements) => {
	openClose.visuallyOpen(unitName);
	const options = Object.assign({$wrapper}, unitElements);
	return ngServices.$animate.removeClass(unitElements.$sizeElement, hiddenClass, options);
};
const closeUnit = (openClose, hiddenClass, $wrapper, unitName, unitElements) => {
	const options = Object.assign({$wrapper}, unitElements);
	return ngServices.$animate.addClass(unitElements.$sizeElement, hiddenClass, options).then(() => {
		openClose.visuallyClose(unitName);
	});
};

const resizeUnit = (openClose, hiddenClass, $wrapper, unitName, unitElements) => {
	openClose.visuallyOpen(unitName);
	const options = Object.assign({$wrapper}, unitElements);
	return ngServices.$animate.animate(unitElements.$sizeElement, null, { resize: true }, null, options);
};

const addToUnit = (unitStore, unitName, propName, propValue) => {
	const unit = unitStore[unitName] || {};
	unit[propName] = propValue;
	unitStore[unitName] = unit;
};

const elementRoles = new Map([
	["size", "$sizeElement"],
	["scroll", "$scrollElement"],
	["content", "$contentElement"],
]);

const registerElement = (unitStore, elementRole, unitName, $element) => {
	addToUnit(unitStore, unitName, elementRoles.get(elementRole), $element);
};

export default class SeeThroughScrollController {
	static get $inject() { return ['$scope', '$element', '$attrs', '$parse']; }

	constructor($scope, $element, $attrs, $parse) {
		const unitStore = {};
		const {hiddenClass} = defaults($attrs, {hiddenClass: defaultHiddenClass});
		const openClose = $parse($attrs.openClose)($scope);
		const {getFullyOpenedUnit} = openClose;

		this.register = partial(registerElement, unitStore);


		const resize = () => {
			console.log("resize");
			const fullyOpenedUnit = openClose.getFullyOpenedUnit();
			if (fullyOpenedUnit) {
				const unit = unitStore[fullyOpenedUnit];
				resizeUnit(openClose, hiddenClass, $element, fullyOpenedUnit, unit);
			}
		};

		$scope.$watch(() => this.isParentFullyOpened(), (isOpened) => {
			if(isOpened) {
				resize();
			}
		});

		$scope.$watch(getFullyOpenedUnit, function (fullyOpenedUnit, oldFullyOpenedUnit) {
			if (fullyOpenedUnit) {
				const unit = unitStore[fullyOpenedUnit];
				openUnit(openClose, hiddenClass, $element, fullyOpenedUnit, unit);
			} else if (oldFullyOpenedUnit) {
				const unit = unitStore[oldFullyOpenedUnit];
				closeUnit(openClose, hiddenClass, $element, oldFullyOpenedUnit, unit);
			}
		});

		registerResizeListener(resize);

		this.resize = resize;
	}

}