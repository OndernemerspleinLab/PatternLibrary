import Modernizr from 'utils/modernizr';
import {arrayfy, existing, unexisting, isEmptyArray, mapObject, filterObject} from 'utils/objectsArrays';

export const canAnimate = () => {
	return Modernizr.csstransforms;
};


// Call either animationCallback or noAnimationCallback depending
// on wether the browser supports enough to succesfully animate
export const canAnimateDecorator = (animationCallback, noAnimationCallback) => {
	const callback = canAnimate() ? animationCallback : noAnimationCallback;
	return callback;
};

// Only call callback when the className matches one of the classNamesFilter
export const checkClassDecorator = (classNamesFilter, callback) => {
	if (unexisting(callback)) {
		return undefined;
	}
	classNamesFilter = arrayfy(classNamesFilter);

	return (config) => {
		const className = config.className;
		if (isEmptyArray(classNamesFilter)) {
			return callback(config);
		}


		if (classNamesFilter.some((classNameFilter) => classNameFilter === className )) {
			return callback(config);
		}
	};
};

const makeAngularCallback = (callback, eventName) => {
	let angularCallback;

	// Pass the arguments as an object to the callback
	// so that they can be treaded as named arguments
	switch (eventName) {
		case 'beforeAnimate':
		case 'animate':
			angularCallback = ($element, from, to, done, options) =>
					callback({$element, from, to, done, options});
			break;

		case 'beforeSetClass':
		case 'setClass':
			angularCallback = ($element, classNameToAdd, classNameToRemove, done, options) =>
					callback({$element, classNameToAdd, classNameToRemove, done, options});
			break;

		case 'beforeAddClass':
		case 'addClass':
		case 'beforeRemoveClass':
		case 'removeClass':
			angularCallback = ($element, className, done, options) =>
					callback({$element, className, done, options});
			break;

		default:
			angularCallback = callback;
			break;
    }

	return angularCallback;
};

// Ignore jshint warnings about to many arguments for this function
// jshint -W072
export const animation = ({
	module,
	selector,

	classNamesFilter,

	beforeAnimate, beforeAnimateInstant,
	animate, animateInstant,

	setClass, setClassInstant,
	beforeSetClass, beforeSetClassInstant,

	addClass, addClassInstant,
	beforeAddClass, beforeAddClassInstant,

	removeClass, removeClassInstant,
	beforeRemoveClass, beforeRemoveClassInstant
}) => {
// jshint +W072

	// All possible animation types
	const fullAnimationConfig = {
		animate: canAnimateDecorator(animate, animateInstant),
		beforeAnimate: canAnimateDecorator(beforeAnimate, beforeAnimateInstant),

		setClass: checkClassDecorator(classNamesFilter, canAnimateDecorator(setClass, setClassInstant)),
		beforeSetClass: checkClassDecorator(classNamesFilter, canAnimateDecorator(beforeSetClass, beforeSetClassInstant)),

		addClass: checkClassDecorator(classNamesFilter, canAnimateDecorator(addClass, addClassInstant)),
		beforeAddClass: checkClassDecorator(classNamesFilter, canAnimateDecorator(beforeAddClass, beforeAddClassInstant)),

		removeClass: checkClassDecorator(classNamesFilter, canAnimateDecorator(removeClass, removeClassInstant)),
		beforeRemoveClass: checkClassDecorator(classNamesFilter, canAnimateDecorator(beforeRemoveClass, beforeRemoveClassInstant)),
	};

	// Filter out properties without a callback
	// so angular animation doesn't erroneously calls it
	const filteredAnimationConfig = filterObject(fullAnimationConfig, existing);

	const animationConfig = mapObject(filteredAnimationConfig, makeAngularCallback);

	// Angular function for registering animations
	return module.animation(selector, () => animationConfig);
};