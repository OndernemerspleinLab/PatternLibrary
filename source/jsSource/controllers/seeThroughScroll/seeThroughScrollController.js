import {hidden as defaultHiddenClass} from 'constants/classNames';
import {mqDisableSeeThroughScroll} from 'constants/mediaQueries';
import {defaults, partial} from 'utils/functional';
import {registerResizeListener} from 'utils/resizeEvent';
import {registerScrollListener} from 'utils/scrollEvent';
import ngServices from 'utils/ngServices';
import Modernizr from 'modernizr';

const openUnit = (openClose, hiddenClass, $wrapper, unitName, unitElements) => {
	openClose.visuallyOpen(unitName);
	const options = Object.assign({$wrapper}, unitElements);
	ngServices.$animate.removeClass(unitElements.$scrollElement, hiddenClass);
	return ngServices.$animate.removeClass(unitElements.$sizeElement, hiddenClass, options);
};

const closeUnit = (openClose, hiddenClass, $wrapper, unitName, unitElements) => {
	const options = Object.assign({$wrapper}, unitElements);
	return ngServices.$animate.addClass(unitElements.$sizeElement, hiddenClass, options).then(() => {
		ngServices.$animate.addClass(unitElements.$scrollElement, hiddenClass);
		openClose.visuallyClose(unitName);
	});
};

const resizeUnit = (openClose, hiddenClass, $wrapper, unitName, unitElements, enabled) => {
	const options = Object.assign({$wrapper, enabled}, unitElements);
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

const registerResizeListners = (resize) => {
	registerResizeListener(resize);

	if (Modernizr.touch) {
		registerScrollListener(resize);
	}
};

export default class SeeThroughScrollController {
	static get $inject() { return ['$scope', '$element', '$attrs', '$timeout', '$parse']; }

	constructor($scope, $element, $attrs, $timeout, $parse) {
		const unitStore = {};
		const {hiddenClass} = defaults($attrs, {hiddenClass: defaultHiddenClass});
		const openClose = $parse($attrs.openClose)($scope);
		const {getFullyOpenedUnit} = openClose;

		this.register = partial(registerElement, unitStore);


		const resizeOne = (unitName) => {
			const unit = unitStore[unitName];
			resizeUnit(openClose, hiddenClass, $element, unitName, unit, openClose.isEnabled());
		};

		const resize = this.resize = () => {
			const fullyOpenedUnit = getFullyOpenedUnit();
			if (fullyOpenedUnit) {
				resizeOne(fullyOpenedUnit);
			}
		};

		const resizeAll = this.resize = () => {
			Object.keys(unitStore).forEach(resizeOne);
		};

		const startListening = () => {
			$scope.$watch(() => this.isParentFullyOpened && this.isParentFullyOpened(), (opened) => {
				if(opened && openClose.isEnabled()) {
					$timeout(resize, 100);
				}
			});

			$scope.$watch(getFullyOpenedUnit, (fullyOpenedUnit, oldFullyOpenedUnit) => {
				if (fullyOpenedUnit) {
					const unit = unitStore[fullyOpenedUnit];
					openUnit(openClose, hiddenClass, $element, fullyOpenedUnit, unit);
				} else if (oldFullyOpenedUnit) {
					const unit = unitStore[oldFullyOpenedUnit];
					closeUnit(openClose, hiddenClass, $element, oldFullyOpenedUnit, unit);
				}
			});

			openClose.setEnabled(!mqDisableSeeThroughScroll.matches);

			mqDisableSeeThroughScroll.addListener((mq) => {
				openClose.setEnabled(!mq.matches);

				if (openClose.isEnabled()) {
					resize();
				} else {
					resizeAll();
				}
			});

			registerResizeListners(resize);
		};

		startListening();
	}

}